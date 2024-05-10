import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';
import { isCPF } from 'validation-br';

export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: 'isCpf',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    return isCPF(value);
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} must be a CPF`;
                },
            },
        });
    };
}
