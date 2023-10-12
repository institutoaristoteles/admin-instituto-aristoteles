import { Button } from "primereact/button"
import { PrimeIcons } from "primereact/api"

export default function Home() {
  return (
    <main>
      <div className="container">
        <Button label="Hello" icon={PrimeIcons.SIGN_IN} />
      </div>
    </main>
  )
}
