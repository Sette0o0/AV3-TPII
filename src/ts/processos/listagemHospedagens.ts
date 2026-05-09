import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorHospedagem from "../impressores/impressorHospedagem";
import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ListagemHospedagens extends Processo {
    private hospedagens: Hospedagem[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens;
    }

    processar(): void {
        console.clear();
        console.log('=== Hóspedes Atualmente Hospedados ===');
        console.log('---------------------------------------');

        if (this.hospedagens.length === 0) {
            console.log('Nenhum hóspede no momento.');
            return;
        }

        this.hospedagens.forEach((hospedagem, index) => {
            console.log(`Registro ${index + 1}:`);
            this.impressor = new ImpressorHospedagem(hospedagem);
            console.log(this.impressor.imprimir());
            console.log('---------------------------------------');
        });

        console.log(`Total de hóspedes: ${this.hospedagens.length}`);
    }
}
