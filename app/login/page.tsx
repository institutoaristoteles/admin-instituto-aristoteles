import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-2 justify-start items-start">
      <h1>Login</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="nome">Nome</label>
        <InputText type="text" id="nome" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Senha</label>
        <Password type="password" id="password" />
      </div>

      <Button label="Enviar" />
    </div>
  )
}
