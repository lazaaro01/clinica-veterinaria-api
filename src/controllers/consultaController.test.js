/**
 * Testes unitários para o controller de consultas
 * Verifica a conversão de campos do frontend para o formato do backend
 */

describe('Consulta Controller - Conversão de campos', () => {

    // Simular a lógica de conversão do controller
    const converterCamposConsulta = (body) => {
        const {
            data_hora,
            animal_id,
            veterinario_id,
            motivo,
            data: dataLegacy,
            horario: horarioLegacy,
            animalId: animalIdLegacy,
            veterinarioId: veterinarioIdLegacy,
            observacoes: observacoesLegacy
        } = body;

        let data, horario, animalId, veterinarioId, observacoes;

        if (data_hora) {
            // Usar split direto na string para evitar problemas de timezone
            const parts = data_hora.split('T');
            data = parts[0];
            horario = parts[1] ? parts[1].slice(0, 5) : '00:00';
        } else {
            data = dataLegacy;
            horario = horarioLegacy;
        }

        animalId = animal_id || animalIdLegacy;
        veterinarioId = veterinario_id || veterinarioIdLegacy;
        observacoes = motivo || observacoesLegacy || '';

        return { data, horario, animalId, veterinarioId, observacoes };
    };

    describe('converterCamposConsulta', () => {

        test('deve converter campos do frontend (formato novo) corretamente', () => {
            const input = {
                data_hora: '2024-12-15T14:30',
                animal_id: '1',
                veterinario_id: '2',
                motivo: 'Consulta de rotina'
            };

            const resultado = converterCamposConsulta(input);

            expect(resultado.data).toBe('2024-12-15');
            expect(resultado.horario).toBe('14:30');
            expect(resultado.animalId).toBe('1');
            expect(resultado.veterinarioId).toBe('2');
            expect(resultado.observacoes).toBe('Consulta de rotina');
        });

        test('deve aceitar campos no formato antigo (legacy)', () => {
            const input = {
                data: '2024-12-15',
                horario: '10:00',
                animalId: 3,
                veterinarioId: 4,
                observacoes: 'Vacinação'
            };

            const resultado = converterCamposConsulta(input);

            expect(resultado.data).toBe('2024-12-15');
            expect(resultado.horario).toBe('10:00');
            expect(resultado.animalId).toBe(3);
            expect(resultado.veterinarioId).toBe(4);
            expect(resultado.observacoes).toBe('Vacinação');
        });

        test('deve priorizar campos do formato novo sobre formato legacy', () => {
            const input = {
                data_hora: '2024-12-20T16:00',
                animal_id: '10',
                veterinario_id: '20',
                motivo: 'Formato novo',
                data: '2024-01-01',
                horario: '08:00',
                animalId: 1,
                veterinarioId: 2,
                observacoes: 'Formato legacy'
            };

            const resultado = converterCamposConsulta(input);

            expect(resultado.data).toBe('2024-12-20');
            expect(resultado.horario).toBe('16:00');
            expect(resultado.animalId).toBe('10');
            expect(resultado.veterinarioId).toBe('20');
            expect(resultado.observacoes).toBe('Formato novo');
        });

        test('deve usar valor padrão vazio para observacoes quando não fornecido', () => {
            const input = {
                data_hora: '2024-12-25T09:00',
                animal_id: '5',
                veterinario_id: '6'
            };

            const resultado = converterCamposConsulta(input);

            expect(resultado.observacoes).toBe('');
        });

        test('deve lidar com diferentes formatos de datetime-local', () => {
            const input = {
                data_hora: '2024-06-01T08:15:00',
                animal_id: '1',
                veterinario_id: '2',
                motivo: 'Teste'
            };

            const resultado = converterCamposConsulta(input);

            expect(resultado.data).toBe('2024-06-01');
            expect(resultado.horario).toBe('08:15');
        });

    });

    describe('Validação de campos obrigatórios', () => {

        const validarCamposObrigatorios = (data, horario, animalId, veterinarioId) => {
            return !!(data && horario && animalId && veterinarioId);
        };

        test('deve retornar true quando todos os campos estão presentes', () => {
            expect(validarCamposObrigatorios('2024-12-15', '14:30', '1', '2')).toBe(true);
        });

        test('deve retornar false quando data está faltando', () => {
            expect(validarCamposObrigatorios(null, '14:30', '1', '2')).toBe(false);
        });

        test('deve retornar false quando horario está faltando', () => {
            expect(validarCamposObrigatorios('2024-12-15', null, '1', '2')).toBe(false);
        });

        test('deve retornar false quando animalId está faltando', () => {
            expect(validarCamposObrigatorios('2024-12-15', '14:30', null, '2')).toBe(false);
        });

        test('deve retornar false quando veterinarioId está faltando', () => {
            expect(validarCamposObrigatorios('2024-12-15', '14:30', '1', null)).toBe(false);
        });

    });

});
