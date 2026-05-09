import Processo from "../abstracoes/processo";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import Armazem from "../dominio/armazem";
import MenuAcomodacoes from "../menus/menuAcomodacoes";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
    private clientes: Cliente[];
    private hospedagens: Hospedagem[];

    constructor() {
        super();
        this.menu = new MenuAcomodacoes();
        this.clientes = Armazem.InstanciaUnica.Clientes;
        this.hospedagens = Armazem.InstanciaUnica.Hospedagens;
    }

    processar(): void {
        console.clear();
        console.log('=== Check-in de Hóspede ===');

        if (this.clientes.length === 0) {
            console.log('Nenhum cliente cadastrado. Cadastre um cliente primeiro.');
            return;
        }

        const clientesDisponiveis = this.clientes.filter(c =>
            c.Titular === undefined &&
            !this.hospedagens.some(h => h.Cliente === c)
        );

        if (clientesDisponiveis.length === 0) {
            console.log('Todos os clientes titulares já estão hospedados ou não há titulares cadastrados.');
            return;
        }

        console.log('\nClientes disponíveis para check-in:');
        console.log('--------------------------------------');
        clientesDisponiveis.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome} (${cliente.NomeSocial})`);
        });
        console.log('--------------------------------------');

        const indiceCliente = this.entrada.receberNumero('Selecione o número do cliente:') - 1;

        if (indiceCliente < 0 || indiceCliente >= clientesDisponiveis.length) {
            console.log('Opção inválida. Check-in cancelado.');
            return;
        }

        const clienteSelecionado = clientesDisponiveis[indiceCliente];

        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual acomodação desejada?');

        const acomodacao = this.obterAcomodacao(this.opcao);
        if (!acomodacao) {
            console.log('Opção inválida. Check-in cancelado.');
            return;
        }

        const hospedagem = new Hospedagem(clienteSelecionado, acomodacao);
        this.hospedagens.push(hospedagem);

        console.log(`\nCheck-in realizado com sucesso!`);
        console.log(`Hóspede: ${clienteSelecionado.Nome}`);
        console.log(`Acomodação: ${acomodacao.NomeAcomadacao.toString()}`);
    }

    private obterAcomodacao(opcao: number): Acomodacao | null {
        switch (opcao) {
            case 1: return new DiretorCasalSimples().construir();
            case 2: return new DiretorFamiliaSimples().construir();
            case 3: return new DiretorFamiliaMais().construir();
            case 4: return new DiretorFamiliaSuper().construir();
            case 5: return new DiretorSolteiroSimples().construir();
            case 6: return new DiretorSolteiroMais().construir();
            default: return null;
        }
    }
}
