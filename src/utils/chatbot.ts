/* eslint-disable sonarjs/no-nested-template-literals */
import { formatarDate } from './format-date'
import { Cliente } from '@/schemas/cliente'
import { Funcionario } from '@/schemas/funcionario'
import { OrdemDeServico } from '@/schemas/os'

export function formatarPessoaFisica(pessoaFisica: Cliente | Funcionario, tipo: string): string {
	const endereco = pessoaFisica.endereco
		? `🏠 Endereço: ${pessoaFisica.endereco.endereco.logradouro.nome}, Nº ${pessoaFisica.endereco.numeroEndereco}, ${pessoaFisica.endereco.endereco.bairro.nome}, ${pessoaFisica.endereco.endereco.cidade.nome} - ${pessoaFisica.endereco.endereco.cidade.unidadeFederativa.sigla}.`
		: '🏠 Endereço: Não informado.'

	return (
		`🔹 ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${pessoaFisica.id}\n` +
		`   🏷️ Nome: ${pessoaFisica.nome} ${pessoaFisica.ultimoNome}\n` +
		`   🆔 CPF: ${pessoaFisica.cpf}\n` +
		`   ✉️ E-mails: ${pessoaFisica.emails.map((e) => e.endereco).join(', ') || 'Nenhum informado'}\n` +
		`   📞 Telefones: ${pessoaFisica.telefones.map((t) => `(${t.ddd.numero}) ${t.numero}`).join(', ') || 'Nenhum informado'}\n` +
		`   ${endereco}`
	)
}

export const formatarCliente = (cliente: Cliente) => formatarPessoaFisica(cliente, 'cliente')

export const formatarFuncionario = (funcionario: Funcionario) => formatarPessoaFisica(funcionario, 'funcionário')

export function formatarOrdemDeServico(ordem: OrdemDeServico) {
	return (
		`📄 Ordem de Serviço ${ordem.numero}\n` +
		`   📅 Emitida em: ${formatarDate(ordem.dataEmissao)}\n` +
		`   👤 Cliente: ${ordem.cliente.nome} ${ordem.cliente.ultimoNome} (Código: ${ordem.cliente.id})\n` +
		`   🏢 Responsável: ${ordem.funcionarioResponsavel.nome} ${ordem.funcionarioResponsavel.ultimoNome} (Código: ${ordem.funcionarioResponsavel.id})\n` +
		`   📝 Descrição: "${ordem.descricao}"\n` +
		`   🛠️ Serviços Realizados:\n${
			ordem.servicosRealizados
				.map((s) => `      🔧 ${s.tipoServico.nome} - R$${s.valorCobrado.toFixed(2)}`)
				.join('\n') || '      Nenhum serviço informado'
		}\n` +
		`   💰 Valor Total: R$${ordem.valorTotal?.toFixed(2) ?? 'não informado'}`
	)
}

export function formatarListaClientes(clientes: Cliente[]) {
	if (clientes.length === 0) return '🚫 Não há clientes cadastrados.'

	return clientes
		.map(
			(cliente) =>
				`👤 Cliente ${cliente.id}\n   🏷️ Nome: ${cliente.nome} ${cliente.ultimoNome}\n   🆔 CPF: ${cliente.cpf}`
		)
		.join('\n\n')
}

export function formatarListaFuncionarios(funcionarios: Funcionario[]) {
	if (funcionarios.length === 0) return 'Não há funcionários cadastrados.'

	return funcionarios
		.map(
			(funcionario) =>
				`🔹 Funcionário ${funcionario.id}\n   👤 Nome: ${funcionario.nome} ${funcionario.ultimoNome}\n   🆔 CPF: ${funcionario.cpf}`
		)
		.join('\n\n')
}

export function formatarListaOrdensDeServico(ordens: OrdemDeServico[]) {
	if (ordens.length === 0) return 'Não há ordens de serviço cadastradas.'

	return ordens
		.map(
			(ordem) =>
				`📌 Ordem de Serviço ${ordem.numero}\n   📅 Emitida em: ${formatarDate(ordem.dataEmissao)}\n   👤 Cliente: ${ordem.cliente.nome} ${ordem.cliente.ultimoNome} (Código: ${ordem.cliente.id})\n   🛠️ Responsável: ${ordem.funcionarioResponsavel.nome} ${ordem.funcionarioResponsavel.ultimoNome} (Código: ${ordem.funcionarioResponsavel.id})`
		)
		.join('\n\n')
}
