class VeryBigNumber {
    readonly DISCHARGE: number = 10;
    private storage: number[] = [];
    private isNegative: boolean;

    constructor(str: string) {
        if (str.length === 0) {
            this.isNegative = false;
        } else {
            if (str[0] === '-') {
                str = str.slice(1);
                this.isNegative = true;
            } else {
                this.isNegative = false;
            }

            for (let i = str.length - 1; i >= 0; i--) {
                this.storage.push(Number(str[i]));
            }

            this.removeFirstZeros();
        }
    }

    read() {
        let str = this.isNegative ? '-' : '';

        if (!this.storage.length) {
            return '0';
        }

        for (let i = this.storage.length - 1; i >=0; i--) {
            str += this.storage[i];
        }

        return str;
    }

    plus(num: VeryBigNumber): VeryBigNumber {
        // приводим к виду (+) + (+) или (+) - (+)
        if (this.isNegative && num.isNegative) {
            return this.toOpposite().plus(num.toOpposite()).toOpposite();
        }
        if (!this.isNegative && num.isNegative) {
            return this.minus(num.toOpposite());
        }
        if (this.isNegative && !num.isNegative) {
            return num.minus(this.toOpposite());
        }

        // Сложение двух положительных чисел (+) + (+)
        const result: VeryBigNumber = new VeryBigNumber('0');
        let transfer = 0;
        for (let i = 0; i < Math.max(this.storage.length, num.storage.length); i++) {
            const sum: number = (this.storage[i] || 0) + (num.storage[i] || 0) + transfer;
            transfer = sum >= this.DISCHARGE ? 1 : 0;
            result.storage.push(sum % this.DISCHARGE);
            if (i === Math.max(this.storage.length, num.storage.length) - 1 && sum >= this.DISCHARGE) {
                result.storage.push(1);
            }
        }

        return result;
    }

    minus(num: VeryBigNumber): VeryBigNumber {
        // приводим к виду (+) + (+) или (+) - (+)
        if (!this.isNegative && !num.isNegative && num.isGreaterThan(this)) {
            return num.minus(this).toOpposite();
        }
        if (num.isNegative) {
            return this.plus(num.toOpposite());
        }
        if (this.isNegative && !num.isNegative) {
            return this.toOpposite().plus(num).toOpposite();
        }

        // Вычитание положительных чисел (+) - (+), где первое число больше либо равно второму
        const result: VeryBigNumber = new VeryBigNumber('0');

        if (this.isEqualTo(num)) {
            return result;
        }

        let transfer = 0;
        for (let i = 0; i < this.storage.length; i++) {
            const difference = this.storage[i] - (num.storage[i] || 0) - transfer;
            transfer = difference < 0 ? 1 : 0;
            result.storage[i] = difference >= 0 ? difference : this.DISCHARGE + difference;
        }

        result.removeFirstZeros()
        return result;
    }

    multiply(num: VeryBigNumber): VeryBigNumber {
        let result: VeryBigNumber = new VeryBigNumber('0');

        for (let i = 0; i < this.storage.length; i++) {
            for (let j = 0; j < num.storage.length; j++) {
                const tempMultiplyStringResult: string = (this.storage[i] * num.storage[j]).toString() + '0'.repeat(i + j);
                const tempMultiplyResult: VeryBigNumber = new VeryBigNumber(tempMultiplyStringResult);
                result = result.plus(tempMultiplyResult);
            }
        }

        // Определяем знак получившегося числа
        if (this.isNegative !== num.isNegative) {
            result.isNegative = true;
        }

        return result;
    }

    divide(num: VeryBigNumber): VeryBigNumber {

        // Приводим к виду (+) / (+)
        if (this.isNegative && num.isNegative) {
            return this.toOpposite().divide(num.toOpposite());
        }
        if (!this.isNegative && num.isNegative) {
            return this.divide(num.toOpposite()).toOpposite();
        }
        if (this.isNegative && !num.isNegative) {
            return this.toOpposite().divide(num).toOpposite();
        }

        const result: VeryBigNumber = new VeryBigNumber('0');
        let tempDividend: VeryBigNumber = new VeryBigNumber('0');
        let tempDivider: VeryBigNumber = new VeryBigNumber('0');

        for (let i = 1; i <= num.storage.length; i++) {
            const temp: VeryBigNumber = new VeryBigNumber(this.read().slice(0, i));
            if (temp.isGreaterThan(num) || temp.isEqualTo(num)) {
                tempDividend = new VeryBigNumber(temp.read());
                break;
            }
        }

        // Если в temp не записалось число, значит делимое меньше делителя, ответ 0
        if (tempDividend.isEqualTo(new VeryBigNumber('0'))) {
            return result;
        }

        for (let i = this.storage.length - tempDividend.storage.length - 1;  i >= -1; i--) {
            let count = 0;
            while (tempDividend.isGreaterThan(tempDivider) || tempDividend.isEqualTo(tempDivider)) {
                tempDivider = tempDivider.plus(num);
                count++;
            }

            count--;
            tempDivider = tempDivider.minus(num);

            result.storage.unshift(count);

            tempDividend = new VeryBigNumber(tempDividend.minus(tempDivider).read() + this.storage[i]?.toString());
            tempDivider = new VeryBigNumber('0');
            count = 0;
        }

        return result;
    }

    isEqualTo(num: VeryBigNumber): boolean {
        return this.read() === num.read();
    }

    isGreaterThan(num: VeryBigNumber): boolean {
        if (!this.isNegative && num.isNegative) {
            return true;
        }
        if (this.isNegative && !num.isNegative) {
            return false;
        }
        const bothArePositive: boolean = !this.isNegative && !num.isNegative;
        if (this.storage.length > num.storage.length) {
            return bothArePositive ? true : false;
        } else if (this.storage.length < num.storage.length) {
            return bothArePositive ? false : true;
        } else {
            for (let i = this.storage.length - 1; i >= 0; i--) {
                if (this.storage[i] !== num.storage[i]) {
                    return bothArePositive ? (this.storage[i] > num.storage[i]) : !(this.storage[i] > num.storage[i]);
                }
            }
        }
        // Если ни одно из условий не вернуло ответ значит числа равны
        return false;
    }

    toOpposite (): VeryBigNumber {
        this.isNegative = !this.isNegative;
        return this;
    }

    private removeFirstZeros(): void {
        for (let i = this.storage.length - 1; i >= 0; i--) {
            if (this.storage[i] === 0) {
                this.storage.pop();
            } else {
                break;
            }
        }
    }
}

module.exports = VeryBigNumber;