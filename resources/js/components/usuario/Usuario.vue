<template>
    <div id="componentePagamento">
        <fieldset>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Usuario</h1>
                <div class="row">
                    <div class="col-xl-3 col-md-6" v-if="formulario">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <a @click="mostraFormUsuario()" href="#"
                                   class="small text-white stretched-link text-decoration-none"><i
                                    class="fas fa-list"></i> Lista de Usuários</a>
                                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6" v-if="!formulario">
                        <div class="card bg-success text-white mb-4">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <a @click="mostraFormUsuario()" href="#"
                                   class="small text-white stretched-link text-decoration-none"><i
                                    class="fas fa-plus"></i> Novo Usuário</a>
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
                            <div class="card-header"><h3 class="font-weight-light my-3">Novo Usuário</h3></div>
                            <div class="card-body">
                                <form>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" v-model="form.nome" type="text"/>
                                                <label for="inputFirstName">Nome</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" v-model="form.email" type="email"/>
                                                <label for="inputFirstName">E-mail</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0" v-if="!editando">
                                                <input class="form-control" v-model="form.password" type="password"/>
                                                <label for="inputFirstName">Senha</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <select class="form-control" v-model="form.tipo">
                                                    <option value="" selected>Selecione</option>
                                                    <option :value="'Adminstrador'">Adminstrador</option>
                                                    <option :value="'Vendedor'">Vendedor</option>
                                                    <option :value="'Cliente'">Cliente</option>
                                                </select>
                                                <label for="inputFirstName">Tipo</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 mb-0">
                                        <button v-if="editando" class="btn btn-success" @click="alterar(form.id)"><i class="fa fa-save"></i>
                                            Confirma
                                        </button>
                                        <button v-else class="btn btn-success" @click="salvar()"><i class="fa fa-save"></i>
                                            Salvar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid px-4" v-if="lista && !formulario">
                <div class="card mb-4">
                    <div class="card-header">
                        Lista de Usuário
                    </div>
                    <div class="card-body">
                        <table class="table table-responsive">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Perfil</th>
                                <th>Ação</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="usuario in listaUsuario">
                                <td>{{ usuario.nome }}</td>
                                <td>{{ usuario.email }}</td>
                                <td>{{ usuario.tipo }}</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-primary"
                                            @click="formAlterar(usuario.id)">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-danger"
                                            @click="excluir(usuario.id)">
                                        <i class="fa fa-trash"></i>
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

export default {
    name: 'Usuario',
    data() {
        return {
            hash: String(Math.random()).substr(2),

            preload: false,
            editando: false,
            formulario: false,
            lista: false,

            form: {
                nome: '',
                email:'',
                password:'',
                tipo:'',
            },

            listaUsuario: [],

            formDefault: false,

            URL_ADMIN_LOCAL: 'http://127.0.0.1:8000/admin'
        }
    },
    mounted() {
        this.formDefault = _.cloneDeep(this.form);
        this.atualizar();
    },
    methods: {
        mostraFormUsuario() {
            this.form = _.cloneDeep(this.formDefault)
            this.formulario = !this.formulario;
            this.editando= false;
        },
        salvar() {
            axios.post(this.URL_ADMIN_LOCAL + `/usuario`, this.form).then(response => {
                if (response.status === 201) {
                    mostraSucesso('', 'Usuário Cadastrado com Sucesso');
                    this.atualizar();
                }
            }).catch(error => {
                mostraErro('', 'Verificar os erros');
                return false;
            })
        },
        formAlterar(usuario) {
            this.form = _.cloneDeep(this.formDefault) //copia
            this.formulario = false;
            axios.get(this.URL_ADMIN_LOCAL + `/usuario/${usuario}/edit`)
                .then(response => {
                    Object.assign(this.form, response.data);
                    this.editando = true;
                    this.formulario = true;
                }).catch(error => {
                return false;
            });
        },
        alterar(usuario) {
            axios.put(this.URL_ADMIN_LOCAL + `/usuario/${usuario}`, this.form)
                .then(response => {
                    if(response.status === 200){
                        this.atualizar();
                    }
                }).catch(error => {
                return false;
            });
        },
        excluir(usuario) {
            this.formulario = false;
            axios.delete(this.URL_ADMIN_LOCAL + `/usuario/${usuario}`)
                .then(response => {
                    if(response.status === 200){
                        this.atualizar();
                    }
                }).catch(error => {
                return false;
            });
        },
        atualizar() {
            axios.get(this.URL_ADMIN_LOCAL + `/usuario/atualizar`).then(response => {
                this.listaUsuario = response.data;
                this.formulario = false;
                this.lista = true;
            })
        },
    },
}
</script>
