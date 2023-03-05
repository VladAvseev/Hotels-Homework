const VeryBigNumber = require('./task2');

describe('VeryBigNumber', () => {
    describe('read', () => {
        test('Положительное число', () => {
            const bigNumber: typeof VeryBigNumber = new VeryBigNumber('123123456789123456789');
            expect(bigNumber.read()).toBe('123123456789123456789');
        });

        test('Отрицательное число', () => {
            const bigNumber: typeof VeryBigNumber = new VeryBigNumber('-123123456789123456789');
            expect(bigNumber.read()).toBe('-123123456789123456789');
        });

        test('Число с нулями в начале', () => {
            const bigNumber: typeof VeryBigNumber = new VeryBigNumber('000123123456789123456789');
            expect(bigNumber.read()).toBe('123123456789123456789');
        });
    });

    describe('toOpposite', () => {
        test('Положительное число', () => {
            const bigNumber1: typeof VeryBigNumber = new VeryBigNumber('123123456789123456789');
            const bigNumber2: typeof VeryBigNumber = new VeryBigNumber('-123123456789123456789');
            expect(bigNumber1.toOpposite()).toEqual(bigNumber2);
        });

        test('Отрицательное число', () => {
            const bigNumber1: typeof VeryBigNumber = new VeryBigNumber('-123123456789123456789');
            const bigNumber2: typeof VeryBigNumber = new VeryBigNumber('123123456789123456789');
            expect(bigNumber1.toOpposite()).toEqual(bigNumber2);
        });
    });

    describe('isEqualTo', () => {
        test('Два равных числа', () => {
            const bigNumber1: typeof VeryBigNumber = new VeryBigNumber('123123456789123456789');
            const bigNumber2: typeof VeryBigNumber = new VeryBigNumber('123123456789123456789');
            expect(bigNumber1.isEqualTo(bigNumber2)).toBe(true);
            expect(bigNumber2.isEqualTo(bigNumber1)).toBe(true);
        });

        test('Два не равных числа', () => {
            const bigNumber1: typeof VeryBigNumber = new VeryBigNumber('123123456789123456789');
            const bigNumber2: typeof VeryBigNumber = new VeryBigNumber('123123456789123456780');
            expect(bigNumber1.isEqualTo(bigNumber2)).toBe(false);
            expect(bigNumber2.isEqualTo(bigNumber1)).toBe(false);
        });
    });

    describe('isGreaterThan', () => {
        // Шаблон теста функции isGreaterThan
        // Нельзя запустить отдельно один тест!
        // Не то же самое что beforeEach, так как для каждого теста вводятся разные данные
        function isGreaterThanTestTemplate(describe: string, num1: string, num2: string, result: boolean) {
            test(describe, () => {
                const bigNumber1: typeof VeryBigNumber = new VeryBigNumber(num1);
                const bigNumber2: typeof VeryBigNumber = new VeryBigNumber(num2);
                expect(bigNumber1.isGreaterThan(bigNumber2)).toBe(result);
            })
        }

        isGreaterThanTestTemplate(
            '1 число положительное, 2 отрицательное',
            '123123456789123456789',
            '-123123456789123456789',
            true);

        isGreaterThanTestTemplate(
            '1 число отрицательное, 2 положительное',
            '-123123456789123456789',
            '123123456789123456789',
            false);

        isGreaterThanTestTemplate(
            'Два положительных, 1 длиннее 2',
            '123123456789123456789000',
            '123123456789123456789',
            true);

        isGreaterThanTestTemplate(
            'Два отрицательных, 1 длиннее 2',
            '-123123456789123456789000',
            '-123123456789123456789',
            false);

        isGreaterThanTestTemplate(
            'Два положительных, 2 длиннее 1',
            '123123456789123456789',
            '123123456789123456789000',
            false);

        isGreaterThanTestTemplate(
            'Два отрицательных, 2 длиннее 1',
            '-123123456789123456789',
            '-123123456789123456789000',
            true);

        isGreaterThanTestTemplate(
            'Два положительных, одинаковая длина, |1| > |2|',
            '123123456789123456789',
            '123123456789123456780',
            true);

        isGreaterThanTestTemplate(
            'Два отрицательных, одинаковая длина, |1| > |2|',
            '-123123456789123456789',
            '-123123456789123456780',
            false);

        isGreaterThanTestTemplate(
            'Два отрицательных, одинаковая длина, |1| > |2|',
            '-123123456789123456789',
            '-123123456789123456780',
            false);

        isGreaterThanTestTemplate(
            'Два положительных, одинаковая длина, |1| < |2|',
            '123123456789123456780',
            '234344343499411111293',
            false);

        isGreaterThanTestTemplate(
            'Два отрицательных, одинаковая длина, |1| < |2|',
            '-123123456789123456780',
            '-123123456789123456789',
            true);

        isGreaterThanTestTemplate(
            'Два равных числа',
            '123123456789123456789',
            '123123456789123456789',
            false);
    })

    describe('Операции сложения, вычитания, умножения, деления', () => {
        describe('plus', () => {
            // Шаблон теста для функции plus
            // В отличие от шаблона для isGreaterThan, здесь можно запустить отдельно один тест
            // Не то же самое что beforeEach, так как для каждого теста вводятся разные данные
            function plusTestTemplate(num1: string, num2: string, result: string) {
                const bigNumber1: typeof VeryBigNumber = new VeryBigNumber(num1);
                const bigNumber2: typeof VeryBigNumber = new VeryBigNumber(num2);
                const bigNumberResult: typeof VeryBigNumber = new VeryBigNumber(result);
                expect(bigNumber1.plus(bigNumber2)).toEqual(bigNumberResult);
            }

            test('Два положительных числа', () => {
                plusTestTemplate('123123456789123456789', '123123456789123456789', '246246913578246913578');
                plusTestTemplate('123123456789123456789', '1', '123123456789123456790');
                plusTestTemplate('1', '123123456789123456789', '123123456789123456790');
                plusTestTemplate('123123456789123456789', '123456789123456789', '123246913578246913578');
            });

            test('Первое ноль, второе положительное', () => {
                plusTestTemplate('0', '123123456789123456789', '123123456789123456789');
            });

            test('Первое положительное, второе ноль', () => {
                plusTestTemplate('123123456789123456789', '0', '123123456789123456789');
            });

            test('Два нуля', () => {
                plusTestTemplate('0', '0', '0');
            });

            test('Два отрицательных числа', () => {
                plusTestTemplate('-123123456789123456789', '-123123456789123456789', '-246246913578246913578');
            });

            test('Первое положительное, второе отрицательное', () => {
                plusTestTemplate('123123456789123456789', '-123123456789123456780', '9');
                plusTestTemplate('123123456789123456780', '-123123456789123456789', '-9');
            });

            test('Первое отрицательное, второе положительное', () => {
                plusTestTemplate('-123123456789123456780', '123123456789123456789', '9');
                plusTestTemplate('-123123456789123456789', '123123456789123456780', '-9');
            });
        });

        describe('minus', () => {
            // Шаблон теста для функции minus
            function minusTestTemplate(num1: string, num2: string, result: string) {
                const bigNumber1: typeof VeryBigNumber = new VeryBigNumber(num1);
                const bigNumber2: typeof VeryBigNumber = new VeryBigNumber(num2);
                const bigNumberResult: typeof VeryBigNumber = new VeryBigNumber(result);
                expect(bigNumber1.minus(bigNumber2)).toEqual(bigNumberResult);
            }

            test('Два равных числа', () => {
                minusTestTemplate('123123456789123456789', '123123456789123456789', '0');
                minusTestTemplate('-123123456789123456789', '-123123456789123456789', '0');
            });

            test('Два положительных числа, 1 > 2', () => {
                minusTestTemplate('984987654312987654312', '123123456789123456789', '861864197523864197523');
                minusTestTemplate('123123456789123456789', '123456789123456789', '123000000000000000000');
            });

            test('Два положительных числа, 1 < 2', () => {
                minusTestTemplate('123123456789123456780', '123123456789123456789', '-9');
            });

            test('Два отрицательных числа, 1 > 2', () => {
                minusTestTemplate('-123123456789123456780', '-123123456789123456789', '9');
            });

            test('Два отрицательных числа, 1 < 2', () => {
                minusTestTemplate('-123123456789123456789', '-123123456789123456780', '-9');
            });

            test('Первое положительное, Второе отрицательное', () => {
                minusTestTemplate('123123456789123456789', '-123123456789123456780', '246246913578246913569');
            });

            test('Первое отрицательное, Второе положительное', () => {
                minusTestTemplate('-123123456789123456789', '123123456789123456780', '-246246913578246913569');
            });
        });

        describe('multiply', () => {
            // Шаблон теста для функции multiply
            function multiplyTestTemplate(num1: string, num2: string, result: string) {
                const bigNumber1: typeof VeryBigNumber = new VeryBigNumber(num1);
                const bigNumber2: typeof VeryBigNumber = new VeryBigNumber(num2);
                const bigNumberResult: typeof VeryBigNumber = new VeryBigNumber(result);
                expect(bigNumber1.multiply(bigNumber2)).toEqual(bigNumberResult);
            }

            test('Два положительных числа', () => {
                multiplyTestTemplate('123123456789123456789', '123123456789123456789', '15159385611703151043772515622620750190521');
                multiplyTestTemplate('123123456789123456789', '123456789123456789', '15200426640965858725515622620750190521');
                multiplyTestTemplate('123456789123456789', '123123456789123456789', '15200426640965858725515622620750190521');
                multiplyTestTemplate('123456789123456789', '10', '1234567891234567890');
                multiplyTestTemplate('10', '123456789123456789', '1234567891234567890');
            });

            test('Два отрицательных числа', () => {
                multiplyTestTemplate('-123123456789123456789', '-123123456789123456789', '15159385611703151043772515622620750190521');
            });

            test('Первое положительное, Второе отрицательное', () => {
                multiplyTestTemplate('123123456789123456789', '-123123456789123456789', '-15159385611703151043772515622620750190521');
            });

            test('Первое отрицательное, Второе положительное', () => {
                multiplyTestTemplate('-123123456789123456789', '123123456789123456789', '-15159385611703151043772515622620750190521');
            });

            test('Умножение на ноль', () => {
                multiplyTestTemplate('0', '0', '0');
                multiplyTestTemplate('0', '123123456789123456789', '0');
                multiplyTestTemplate('123123456789123456789', '0', '0');
            })

            test('Умножение на единицу', () => {
                multiplyTestTemplate('1', '123123456789123456789', '123123456789123456789');
                multiplyTestTemplate('123123456789123456789', '1', '123123456789123456789');
            })
        });

        describe('divide', () => {
            // Шаблон теста для функции divide
            function divideTestTemplate(num1: string, num2: string, result: string) {
                const bigNumber1: typeof VeryBigNumber = new VeryBigNumber(num1);
                const bigNumber2: typeof VeryBigNumber = new VeryBigNumber(num2);
                const bigNumberResult: typeof VeryBigNumber = new VeryBigNumber(result);
                expect(bigNumber1.divide(bigNumber2)).toEqual(bigNumberResult);
            }

            test('Два положительных числа', () => {
                divideTestTemplate('1231234567891234567890', '123123456789123456789', '10');
                divideTestTemplate('1231234567891234567890', '10', '123123456789123456789');
                divideTestTemplate('15159385611703151043772515622620750190521', '123123456789123456789', '123123456789123456789');
            });

            test('Два отрицательных числа', () => {
                divideTestTemplate('-15159385611703151043772515622620750190521', '-123123456789123456789', '123123456789123456789');
            });

            test('Первое положительное, Второе отрицательное', () => {
                divideTestTemplate('15159385611703151043772515622620750190521', '-123123456789123456789', '-123123456789123456789');
            });

            test('Первое отрицательное, Второе положительное', () => {
                divideTestTemplate('-15159385611703151043772515622620750190521', '123123456789123456789', '-123123456789123456789');
            });

            test('Деление на единицу', () => {
                divideTestTemplate('123123', '1', '123123');
            });

            test('Первое первое меньше второго', () => {
                divideTestTemplate('123123', '123123123', '0');
            });

            // Возвращает целую часть от деления
            test('Первое не делиться нацело на второе', () => {
                divideTestTemplate('15159385611703151043772515622620750190521', '100', '151593856117031510437725156226207501905');
                divideTestTemplate('15159385611703151043772515622620750190521', '123123456789123456', '123123456789123457578000');
                // остаток отрицательный -622521
                divideTestTemplate('-15159385611703151043772515622620750190521', '123123456789123456', '-123123456789123457578000');
            })
        });
    });
});