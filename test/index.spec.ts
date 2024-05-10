import { validate } from 'class-validator';
import {IsCpf} from "../src";

class UserCPF {
    @IsCpf()
    cpf: string;
}

async function isValidCpf(cpfToBeValidated: string): Promise<boolean> {
    const userCPF = new UserCPF();
    userCPF.cpf = cpfToBeValidated;

    return validate(userCPF).then(errors => {
        return errors.length <= 0;
    })
}

describe('Index Test', () => {
    it('should be a valid CPF with punctuation', async () => {
        await expect(isValidCpf('706.909.390-00')).resolves.toBe(true)
    })

    it('should be a valid CPF without punctuation', async () => {
        await expect(isValidCpf('62818684048')).resolves.toBe(true)
    })

    it('should be a invalid CPF if empty', async () => {
        await expect(isValidCpf('')).resolves.toBe(false)
    })

    it('should be a invalid CPFs with invalid string lengths', async () => {
        await expect(isValidCpf('623275940068')).resolves.toBe(false)
        await expect(isValidCpf('623275940')).resolves.toBe(false)
        await expect(isValidCpf('5940689')).resolves.toBe(false)
        await expect(isValidCpf('6232759400689')).resolves.toBe(false)
    })

    it('should be a invalid CPFs with invalid digits', async () => {
        await expect(isValidCpf('11111111111')).resolves.toBe(false)
        await expect(isValidCpf('22222222222')).resolves.toBe(false)
        await expect(isValidCpf('33333333333')).resolves.toBe(false)
        await expect(isValidCpf('44444444444')).resolves.toBe(false)
        await expect(isValidCpf('55555555555')).resolves.toBe(false)
        await expect(isValidCpf('66666666666')).resolves.toBe(false)
        await expect(isValidCpf('77777777777')).resolves.toBe(false)
        await expect(isValidCpf('88888888888')).resolves.toBe(false)
        await expect(isValidCpf('99999999999')).resolves.toBe(false)
    });

    it('should be a invalid CPFs with invalid verification digits', async () => {
        await expect(isValidCpf('706.909.390-01')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-02')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-03')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-04')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-05')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-06')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-07')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-08')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-09')).resolves.toBe(false)
    });

    it('should be a invalid CPFs with invalid punctuation', async () => {
        await expect(isValidCpf('706.909.390-0a')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0b')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0c')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0d')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0e')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0f')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0g')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0h')).resolves.toBe(false)
        await expect(isValidCpf('706.909.390-0i')).resolves.toBe(false)
    });

    it('should be a invalid CPFs with invalid strings', async () => {
        await expect(isValidCpf('6232759fdsffs4006')).resolves.toBe(false)
        await expect(isValidCpf('6232759fdsffs40063')).resolves.toBe(false)
        await expect(isValidCpf('6!!!232$#%75$$940@@06++')).resolves.toBe(false)
        await expect(isValidCpf('@@@62327!!%594006___++')).resolves.toBe(false)
        await expect(isValidCpf('62327594006+@_!!')).resolves.toBe(false)
        await expect(isValidCpf('623275&¨¨#94006')).resolves.toBe(false)
        await expect(isValidCpf(')%$(!@#62327594006')).resolves.toBe(false)
    });
})
