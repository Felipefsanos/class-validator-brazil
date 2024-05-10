# class-validator-brazil

Biblioteca que expões decorators de validação usando a biblioteca [class-validator](https://www.npmjs.com/package/class-validator) 
e realizando as validações com [validation-br](https://www.npmjs.com/package/validation-br)

## Instalação

```bash
npm install class-validator-brazil
```

## Uso

```typescript
import { IsCpf, IsCnpj, IsCpfOrCnpj } from 'class-validator-brazil';

class Pessoa {
  @IsCpf()
  cpf: string;
}
```

## Decorators
@IsCpf() - Valida se o valor é um CPF válido


## Dependências
- [class-validator](https://www.npmjs.com/package/class-validator)
- [validation-br](https://www.npmjs.com/package/validation-br)
