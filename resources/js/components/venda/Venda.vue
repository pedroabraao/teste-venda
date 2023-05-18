<template>
    <div id="componentePagamento">
        <fieldset>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Usuario</h1>
                <div class="row">
                    <div class="col-xl-3 col-md-12" v-if="formulario">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <a @click="mostraFormVenda()" href="#"
                                   class="small text-white stretched-link text-decoration-none"><i
                                    class="fas fa-list"></i> Lista de Vendas</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-12" v-if="!formulario">
                        <div class="card bg-success text-white mb-4">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <a @click="mostraFormVenda()" href="#"
                                   class="small text-white stretched-link text-decoration-none"><i
                                    class="fas fa-plus"></i> Nova Venda</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--            Form Pagamento-->
            <div class="container-fluid px-4" v-if="formulario">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card shadow-sm border-0 rounded-lg">
                            <div class="card-header"><h3 class="font-weight-light my-3">Nova Venda</h3></div>
                            <div class="card-body">
                                <form>

                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <select class="form-control" v-model="form.cliente_id">
                                                    <option value="" selected>Selecione</option>
                                                    <option v-for="cliente in listaCliente" :value="cliente.id">
                                                        {{ cliente.nome }}
                                                    </option>
                                                </select>
                                                <label for="inputFirstName">Cliente</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <select class="form-control" v-model="form.funcionario_id">
                                                    <option value="" selected>Selecione</option>
                                                    <option v-for="vendedor in listaVendedor" :value="vendedor.id">
                                                        {{ vendedor.nome }}
                                                    </option>
                                                </select>
                                                <label for="inputFirstName">Vendedor</label>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset>
                                        <legend>Itens da Venda</legend>

                                        <button type="button" class="btn btn-sm btn-secondary mb-2"
                                                @click.prevent="addProduto($event.target);">
                                            <i class="fas fa-plus" aria-hidden="true"></i>
                                            Adicionar Produto
                                        </button>

                                        <div class="row" v-for="(item,key) in form.itens">

                                            <div class="col-md-5">
                                                <label>Produto</label>
                                                <select class="form-control" v-model="item.produto_id"
                                                        @change="selecionaProduto(item.produto_id, key)">
                                                    <option :value="''">Selecione</option>
                                                    <option v-for="f in listaProduto" :value="f.id">{{ f.nome }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div class="col-md-2">
                                                <div class="form-group mt-1">
                                                    <button class="btn btn-danger btn-block mt-md-4"
                                                            style="margin-top: 20px !important;" type="button"
                                                            @click="removerProduto(key)">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="alert alert-success text-center mt-2">
                                        <h4 class="pt-2">Saldo Final: R$
                                            <strong>{{ total | Dinheiro }}</strong></h4>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <select class="form-control" v-model="form.forma_pag_id">
                                                    <option value="" selected>Selecione</option>
                                                    <option v-for="pagamento in listaFormaPagamento"
                                                            :value="pagamento.id">{{ pagamento.nome }}
                                                    </option>
                                                </select>
                                                <label for="inputFirstName">Forma de Pagamento</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-md-12">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <select class="form-control" v-model="form.parcela">
                                                    <option :value="'Não'" selected>Não</option>
                                                    <option :value="'Sim'">Sim</option>
                                                </select>
                                                <label for="inputFirstName">Parcela?</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3" v-if="form.parcela === 'Sim'">
                                        <div class="col-md-12">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <select class="form-control" v-model="form.parcela_total">
                                                    <option value="" selected>Selecione</option>
                                                    <option value="1">1x</option>
                                                    <option value="2">2x</option>
                                                    <option value="3">3x</option>
                                                    <option value="4">4x</option>
                                                    <option value="5">5x</option>
                                                    <option value="6">6x</option>
                                                    <option value="7">7x</option>
                                                    <option value="8">8x</option>
                                                    <option value="9">9x</option>
                                                </select>
                                                <label for="inputFirstName">Quantidade de parcelas</label>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset v-if="form.parcela === 'Sim'">
                                        <legend>Formas de Parcelamento</legend>

                                        <button type="button" class="btn btn-sm btn-secondary mb-2"
                                                @click.prevent="addParcela($event.target);">
                                            <i class="fas fa-plus" aria-hidden="true"></i>
                                            Adicionar Parcela
                                        </button>

                                        <div class="row" v-for="(item,key) in form.parcelas">

                                            <div class="col-md-4">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input type="date" class="form-control"
                                                           v-model="item.data_pagamento">
                                                    <label for="inputFirstName">Data do Pagamento</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating mb-3 mb-md-0">
                                                    <input class="form-control" v-model="item.valor_text"
                                                           type="text"
                                                           v-mascara:dinheiro/>
                                                    <label for="inputFirstName">Valor</label>
                                                </div>
                                            </div>

                                            <div class="col-md-2">
                                                <div class="form-group mt-1">
                                                    <button class="btn btn-danger btn-block mt-md-4"
                                                            style="margin-top: 20px !important;" type="button"
                                                            @click="removerParcela(key)">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="mt-4 mb-0">
                                        <button v-if="editando" class="btn btn-success" @click="alterar(form.id)"><i
                                            class="fa fa-save"></i>
                                            Confirma
                                        </button>
                                        <button v-else class="btn btn-success" @click="salvar()"><i
                                            class="fa fa-save"></i>
                                            Salvar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Listagem-->
            <div class="container-fluid px-4" v-if="lista && !formulario">
                <div class="card mb-4">
                    <div class="card-header">
                        Lista de Venda
                    </div>
                    <div class="card-body">
                        <table class="table table-responsive">
                            <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Funcionario</th>
                                <th>Forma de Pagamento</th>
                                <th>Valor Total</th>
                                <th>Quitado</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="venda in listaVenda">

                                <td>{{ venda.cliente_id !== null ? venda.cliente.nome : 'Não informado' }}</td>
                                <td>{{ venda.funcionario.nome }}</td>
                                <td>{{ venda.forma_pagamento.nome }}</td>
                                <td>R$ {{ venda.valor_total_text }}</td>
                                <td>{{ venda.parcelamento_quitado == true ? 'Quitado' : 'Não está quitado' }}</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-primary"
                                            @click="formAlterar(venda.id)">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-danger"
                                            @click="excluir(venda.id)">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-success"
                                            @click="quitar(venda.id)">
                                        <i class="fa fa-check"></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>
<script>

import Dinheiro from "../../filters/Dinheiro";

export default {
    name: 'Venda',
    data() {
        return {
            hash: String(Math.random()).substr(2),

            preload: false,
            editando: false,
            formulario: false,
            lista: false,

            form: {
                cliente_id: '',
                funcionario_id: '',
                forma_pag_id: '',
                valor_total_text: 0,
                parcela_total: '',
                parcela: 'Não',
                parcelas: [],
                itens: []
            },

            listaVenda: [],
            listaVendedor: [],
            listaCliente: [],
            listaFormaPagamento: [],
            listaProduto: [],

            formDefault: false,

            URL_ADMIN_LOCAL: 'http://127.0.0.1:8000/admin'
        }
    },
    filters: {
        Dinheiro
    },
    mounted() {
        this.formDefault = _.cloneDeep(this.form);
        this.atualizar();
    },
    computed: {
        total() {
            let total = 0;
            this.form.itens.forEach((item) => {
                total += parseFloat(item.valor);
            })

            return total;
        },
    },
    methods: {
        addProduto() {
            const obj = {};
            obj.nova = true;
            obj.produto_id = '';
            obj.valor = 0;

            this.form.itens.unshift(obj);
        },
        removerProduto(index) {
            this.form.itens.splice(index, 1);
        },
        addParcela() {
            const obj = {};
            obj.nova = true;
            obj.data_pagamento = '';
            obj.valor_text = '';

            this.form.parcelas.unshift(obj);
        },
        removerParcela(index) {
            this.form.parcelas.splice(index, 1);
        },
        selecionaProduto(id, index) {
            let produto = _.find(this.listaProduto, {'id': id});

            this.form.itens[index].valor = produto.valor_unit;
            this.form.itens[index].produto_id = produto.id;
        },
        mostraFormVenda() {
            this.form = _.cloneDeep(this.formDefault)
            this.formulario = !this.formulario;
            this.editando = false;
        },
        salvar() {
            this.form.valor_total_text = this.total;
            axios.post(this.URL_ADMIN_LOCAL + `/venda`, this.form).then(response => {
                if (response.status === 201) {
                    mostraSucesso('', 'Venda Cadastrado com Sucesso');
                    // this.atualizar();
                }
            }).catch(error => {
                mostraErro('', 'Verificar os erros');
                return false;
            })
        },
        formAlterar(venda) {
            this.form = _.cloneDeep(this.formDefault) //copia
            this.formulario = false;
            axios.get(this.URL_ADMIN_LOCAL + `/venda/${venda}/edit`)
                .then(response => {
                    Object.assign(this.form, response.data);
                    Object.assign(this.form.itens, response.data.venda_itens);
                    Object.assign(this.form.parcelas, response.data.venda_parcelas);

                    if (this.form.parcelas.length > 0){
                        this.form.parcela = 'Sim'
                    }
                    this.editando = true;
                    this.formulario = true;
                }).catch(error => {
                return false;
            });
        },
        alterar(venda) {
            axios.put(this.URL_ADMIN_LOCAL + `/venda/${venda}`, this.form)
                .then(response => {
                    if (response.status === 200) {
                        this.atualizar();
                    }
                }).catch(error => {
                return false;
            });
        },
        excluir(venda) {
            this.formulario = false;
            axios.get(this.URL_ADMIN_LOCAL + `/venda/inativa-venda/${venda}`)
                .then(response => {
                    if (response.status === 200) {
                        this.atualizar();
                    }
                }).catch(error => {
                return false;
            });
        },
        quitar(venda) {
            this.formulario = false;
            axios.get(this.URL_ADMIN_LOCAL + `/venda/quitar/${venda}`)
                .then(response => {
                    if (response.status === 200) {
                        this.atualizar();
                    }
                }).catch(error => {
                return false;
            });
        },
        atualizar() {
            axios.get(this.URL_ADMIN_LOCAL + `/venda/atualizar`).then(response => {
                this.listaVenda = response.data.venda;
                this.listaVendedor = response.data.funcionario;
                this.listaCliente = response.data.cliente;
                this.listaFormaPagamento = response.data.formapagamento;
                this.listaProduto = response.data.produto;
                this.formulario = false;
                this.lista = true;
            })
        },
    },
}
</script>
