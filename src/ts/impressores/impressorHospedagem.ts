import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem;

    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem;
    }

    imprimir(): string {
        const cliente = this.hospedagem.Cliente;
        const acomodacao = this.hospedagem.Acomodacao;
        const entrada = this.hospedagem.DataEntrada;

        return `Hóspede: ${cliente.Nome} (${cliente.NomeSocial})\n`
            + `-- Acomodação: ${acomodacao.NomeAcomadacao.toString()}\n`
            + `-- Data de entrada: ${entrada.toLocaleDateString('pt-BR')} `
            + `${entrada.toLocaleTimeString('pt-BR')}\n`;
    }
}
