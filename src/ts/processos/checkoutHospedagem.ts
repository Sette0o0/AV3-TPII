import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class CheckoutHospedagem extends Processo {
    private hospedagens: Hospedagem[];

    constructor() {
        super();
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens;
    }

    processar(): void {
        console.clear();
        console.log('=== Check-out de Hóspede ===');

        if (this.hospedagens.length === 0) {
            console.log('Nenhum hóspede para realizar check-out.');
            return;
        }

        console.log('\nHóspedes atuais:');
        console.log('--------------------------------------');
        this.hospedagens.forEach((hospedagem, index) => {
            console.log(`${index + 1} - ${hospedagem.Cliente.Nome} | Acomodação: ${hospedagem.Acomodacao.NomeAcomadacao.toString()}`);
        });
        console.log('--------------------------------------');

        const indice = this.entrada.receberNumero('Selecione o número do hóspede para check-out (0 para cancelar):') - 1;

        if (indice === -1) {
            console.log('Check-out cancelado.');
            return;
        }

        if (indice < 0 || indice >= this.hospedagens.length) {
            console.log('Opção inválida. Check-out cancelado.');
            return;
        }

        const hospedagem = this.hospedagens[indice];
        this.hospedagens.splice(indice, 1);

        console.log(`\nCheck-out realizado com sucesso!`);
        console.log(`Hóspede ${hospedagem.Cliente.Nome} saiu da acomodação: ${hospedagem.Acomodacao.NomeAcomadacao.toString()}`);
    }
}
