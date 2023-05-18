/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/venda/Venda.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/venda/Venda.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _filters_Dinheiro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../filters/Dinheiro */ "./resources/js/filters/Dinheiro.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Venda',
  data: function data() {
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
    };
  },
  filters: {
    Dinheiro: _filters_Dinheiro__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mounted: function mounted() {
    this.formDefault = _.cloneDeep(this.form);
    this.atualizar();
  },
  computed: {
    total: function total() {
      var total = 0;
      this.form.itens.forEach(function (item) {
        total += parseFloat(item.valor);
      });
      return total;
    }
  },
  methods: {
    addProduto: function addProduto() {
      var obj = {};
      obj.nova = true;
      obj.produto_id = '';
      obj.valor = 0;
      this.form.itens.unshift(obj);
    },
    removerProduto: function removerProduto(index) {
      this.form.itens.splice(index, 1);
    },
    addParcela: function addParcela() {
      var obj = {};
      obj.nova = true;
      obj.data_pagamento = '';
      obj.valor_text = '';
      this.form.parcelas.unshift(obj);
    },
    removerParcela: function removerParcela(index) {
      this.form.parcelas.splice(index, 1);
    },
    selecionaProduto: function selecionaProduto(id, index) {
      var produto = _.find(this.listaProduto, {
        'id': id
      });
      this.form.itens[index].valor = produto.valor_unit;
      this.form.itens[index].produto_id = produto.id;
    },
    mostraFormVenda: function mostraFormVenda() {
      this.form = _.cloneDeep(this.formDefault);
      this.formulario = !this.formulario;
      this.editando = false;
    },
    salvar: function salvar() {
      this.form.valor_total_text = this.total;
      axios.post(this.URL_ADMIN_LOCAL + "/venda", this.form).then(function (response) {
        if (response.status === 201) {
          mostraSucesso('', 'Venda Cadastrado com Sucesso');
          // this.atualizar();
        }
      })["catch"](function (error) {
        mostraErro('', 'Verificar os erros');
        return false;
      });
    },
    formAlterar: function formAlterar(venda) {
      var _this = this;
      this.form = _.cloneDeep(this.formDefault); //copia
      this.formulario = false;
      axios.get(this.URL_ADMIN_LOCAL + "/venda/".concat(venda, "/edit")).then(function (response) {
        Object.assign(_this.form, response.data);
        Object.assign(_this.form.itens, response.data.venda_itens);
        Object.assign(_this.form.parcelas, response.data.venda_parcelas);
        if (_this.form.parcelas.length > 0) {
          _this.form.parcela = 'Sim';
        }
        _this.editando = true;
        _this.formulario = true;
      })["catch"](function (error) {
        return false;
      });
    },
    alterar: function alterar(venda) {
      var _this2 = this;
      axios.put(this.URL_ADMIN_LOCAL + "/venda/".concat(venda), this.form).then(function (response) {
        if (response.status === 200) {
          _this2.atualizar();
        }
      })["catch"](function (error) {
        return false;
      });
    },
    excluir: function excluir(venda) {
      var _this3 = this;
      this.formulario = false;
      axios.get(this.URL_ADMIN_LOCAL + "/venda/inativa-venda/".concat(venda)).then(function (response) {
        if (response.status === 200) {
          _this3.atualizar();
        }
      })["catch"](function (error) {
        return false;
      });
    },
    quitar: function quitar(venda) {
      var _this4 = this;
      this.formulario = false;
      axios.get(this.URL_ADMIN_LOCAL + "/venda/quitar/".concat(venda)).then(function (response) {
        if (response.status === 200) {
          _this4.atualizar();
        }
      })["catch"](function (error) {
        return false;
      });
    },
    atualizar: function atualizar() {
      var _this5 = this;
      axios.get(this.URL_ADMIN_LOCAL + "/venda/atualizar").then(function (response) {
        _this5.listaVenda = response.data.venda;
        _this5.listaVendedor = response.data.funcionario;
        _this5.listaCliente = response.data.cliente;
        _this5.listaFormaPagamento = response.data.formapagamento;
        _this5.listaProduto = response.data.produto;
        _this5.formulario = false;
        _this5.lista = true;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/venda/Venda.vue?vue&type=template&id=b534b164&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/venda/Venda.vue?vue&type=template&id=b534b164& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    attrs: {
      id: "componentePagamento"
    }
  }, [_c("fieldset", [_c("div", {
    staticClass: "container-fluid px-4"
  }, [_c("h1", {
    staticClass: "mt-4"
  }, [_vm._v("Usuario")]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_vm.formulario ? _c("div", {
    staticClass: "col-xl-3 col-md-12"
  }, [_c("div", {
    staticClass: "card bg-primary text-white mb-4"
  }, [_c("div", {
    staticClass: "card-body d-flex align-items-center justify-content-between"
  }, [_c("a", {
    staticClass: "small text-white stretched-link text-decoration-none",
    attrs: {
      href: "#"
    },
    on: {
      click: function click($event) {
        return _vm.mostraFormVenda();
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-list"
  }), _vm._v(" Lista de Vendas")]), _vm._v(" "), _vm._m(0)])])]) : _vm._e(), _vm._v(" "), !_vm.formulario ? _c("div", {
    staticClass: "col-xl-3 col-md-12"
  }, [_c("div", {
    staticClass: "card bg-success text-white mb-4"
  }, [_c("div", {
    staticClass: "card-body d-flex align-items-center justify-content-between"
  }, [_c("a", {
    staticClass: "small text-white stretched-link text-decoration-none",
    attrs: {
      href: "#"
    },
    on: {
      click: function click($event) {
        return _vm.mostraFormVenda();
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus"
  }), _vm._v(" Nova Venda")]), _vm._v(" "), _vm._m(1)])])]) : _vm._e()])]), _vm._v(" "), _vm.formulario ? _c("div", {
    staticClass: "container-fluid px-4"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-lg-12"
  }, [_c("div", {
    staticClass: "card shadow-sm border-0 rounded-lg"
  }, [_vm._m(2), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("form", [_c("div", {
    staticClass: "row mb-3"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "form-floating mb-3 mb-md-0"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.cliente_id,
      expression: "form.cliente_id"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.form, "cliente_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: "",
      selected: ""
    }
  }, [_vm._v("Selecione")]), _vm._v(" "), _vm._l(_vm.listaCliente, function (cliente) {
    return _c("option", {
      domProps: {
        value: cliente.id
      }
    }, [_vm._v("\n                                                    " + _vm._s(cliente.nome) + "\n                                                ")]);
  })], 2), _vm._v(" "), _c("label", {
    attrs: {
      "for": "inputFirstName"
    }
  }, [_vm._v("Cliente")])])])]), _vm._v(" "), _c("div", {
    staticClass: "row mb-3"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "form-floating mb-3 mb-md-0"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.funcionario_id,
      expression: "form.funcionario_id"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.form, "funcionario_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: "",
      selected: ""
    }
  }, [_vm._v("Selecione")]), _vm._v(" "), _vm._l(_vm.listaVendedor, function (vendedor) {
    return _c("option", {
      domProps: {
        value: vendedor.id
      }
    }, [_vm._v("\n                                                    " + _vm._s(vendedor.nome) + "\n                                                ")]);
  })], 2), _vm._v(" "), _c("label", {
    attrs: {
      "for": "inputFirstName"
    }
  }, [_vm._v("Vendedor")])])])]), _vm._v(" "), _c("fieldset", [_c("legend", [_vm._v("Itens da Venda")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-sm btn-secondary mb-2",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.addProduto($event.target);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n                                        Adicionar Produto\n                                    ")]), _vm._v(" "), _vm._l(_vm.form.itens, function (item, key) {
    return _c("div", {
      staticClass: "row"
    }, [_c("div", {
      staticClass: "col-md-5"
    }, [_c("label", [_vm._v("Produto")]), _vm._v(" "), _c("select", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.produto_id,
        expression: "item.produto_id"
      }],
      staticClass: "form-control",
      on: {
        change: [function ($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });
          _vm.$set(item, "produto_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }, function ($event) {
          return _vm.selecionaProduto(item.produto_id, key);
        }]
      }
    }, [_c("option", {
      domProps: {
        value: ""
      }
    }, [_vm._v("Selecione")]), _vm._v(" "), _vm._l(_vm.listaProduto, function (f) {
      return _c("option", {
        domProps: {
          value: f.id
        }
      }, [_vm._v(_vm._s(f.nome) + "\n                                                ")]);
    })], 2)]), _vm._v(" "), _c("div", {
      staticClass: "col-md-2"
    }, [_c("div", {
      staticClass: "form-group mt-1"
    }, [_c("button", {
      staticClass: "btn btn-danger btn-block mt-md-4",
      staticStyle: {
        "margin-top": "20px !important"
      },
      attrs: {
        type: "button"
      },
      on: {
        click: function click($event) {
          return _vm.removerProduto(key);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-times"
    })])])])]);
  })], 2), _vm._v(" "), _c("div", {
    staticClass: "alert alert-success text-center mt-2"
  }, [_c("h4", {
    staticClass: "pt-2"
  }, [_vm._v("Saldo Final: R$\n                                        "), _c("strong", [_vm._v(_vm._s(_vm._f("Dinheiro")(_vm.total)))])])]), _vm._v(" "), _c("div", {
    staticClass: "row mb-3"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "form-floating mb-3 mb-md-0"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.forma_pag_id,
      expression: "form.forma_pag_id"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.form, "forma_pag_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: "",
      selected: ""
    }
  }, [_vm._v("Selecione")]), _vm._v(" "), _vm._l(_vm.listaFormaPagamento, function (pagamento) {
    return _c("option", {
      domProps: {
        value: pagamento.id
      }
    }, [_vm._v(_vm._s(pagamento.nome) + "\n                                                ")]);
  })], 2), _vm._v(" "), _c("label", {
    attrs: {
      "for": "inputFirstName"
    }
  }, [_vm._v("Forma de Pagamento")])])])]), _vm._v(" "), _c("div", {
    staticClass: "row mb-3"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "form-floating mb-3 mb-md-0"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.parcela,
      expression: "form.parcela"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.form, "parcela", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      selected: ""
    },
    domProps: {
      value: "Não"
    }
  }, [_vm._v("Não")]), _vm._v(" "), _c("option", {
    domProps: {
      value: "Sim"
    }
  }, [_vm._v("Sim")])]), _vm._v(" "), _c("label", {
    attrs: {
      "for": "inputFirstName"
    }
  }, [_vm._v("Parcela?")])])])]), _vm._v(" "), _vm.form.parcela === "Sim" ? _c("div", {
    staticClass: "row mb-3"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "form-floating mb-3 mb-md-0"
  }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.parcela_total,
      expression: "form.parcela_total"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.form, "parcela_total", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: "",
      selected: ""
    }
  }, [_vm._v("Selecione")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "1"
    }
  }, [_vm._v("1x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "2"
    }
  }, [_vm._v("2x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "3"
    }
  }, [_vm._v("3x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "4"
    }
  }, [_vm._v("4x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "5"
    }
  }, [_vm._v("5x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "6"
    }
  }, [_vm._v("6x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "7"
    }
  }, [_vm._v("7x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "8"
    }
  }, [_vm._v("8x")]), _vm._v(" "), _c("option", {
    attrs: {
      value: "9"
    }
  }, [_vm._v("9x")])]), _vm._v(" "), _c("label", {
    attrs: {
      "for": "inputFirstName"
    }
  }, [_vm._v("Quantidade de parcelas")])])])]) : _vm._e(), _vm._v(" "), _vm.form.parcela === "Sim" ? _c("fieldset", [_c("legend", [_vm._v("Formas de Parcelamento")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-sm btn-secondary mb-2",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.addParcela($event.target);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-plus",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("\n                                        Adicionar Parcela\n                                    ")]), _vm._v(" "), _vm._l(_vm.form.parcelas, function (item, key) {
    return _c("div", {
      staticClass: "row"
    }, [_c("div", {
      staticClass: "col-md-4"
    }, [_c("div", {
      staticClass: "form-floating mb-3 mb-md-0"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.data_pagamento,
        expression: "item.data_pagamento"
      }],
      staticClass: "form-control",
      attrs: {
        type: "date"
      },
      domProps: {
        value: item.data_pagamento
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(item, "data_pagamento", $event.target.value);
        }
      }
    }), _vm._v(" "), _c("label", {
      attrs: {
        "for": "inputFirstName"
      }
    }, [_vm._v("Data do Pagamento")])])]), _vm._v(" "), _c("div", {
      staticClass: "col-md-4"
    }, [_c("div", {
      staticClass: "form-floating mb-3 mb-md-0"
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: item.valor_text,
        expression: "item.valor_text"
      }, {
        name: "mascara",
        rawName: "v-mascara:dinheiro",
        arg: "dinheiro"
      }],
      staticClass: "form-control",
      attrs: {
        type: "text"
      },
      domProps: {
        value: item.valor_text
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(item, "valor_text", $event.target.value);
        }
      }
    }), _vm._v(" "), _c("label", {
      attrs: {
        "for": "inputFirstName"
      }
    }, [_vm._v("Valor")])])]), _vm._v(" "), _c("div", {
      staticClass: "col-md-2"
    }, [_c("div", {
      staticClass: "form-group mt-1"
    }, [_c("button", {
      staticClass: "btn btn-danger btn-block mt-md-4",
      staticStyle: {
        "margin-top": "20px !important"
      },
      attrs: {
        type: "button"
      },
      on: {
        click: function click($event) {
          return _vm.removerParcela(key);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-times"
    })])])])]);
  })], 2) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "mt-4 mb-0"
  }, [_vm.editando ? _c("button", {
    staticClass: "btn btn-success",
    on: {
      click: function click($event) {
        return _vm.alterar(_vm.form.id);
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-save"
  }), _vm._v("\n                                        Confirma\n                                    ")]) : _c("button", {
    staticClass: "btn btn-success",
    on: {
      click: function click($event) {
        return _vm.salvar();
      }
    }
  }, [_c("i", {
    staticClass: "fa fa-save"
  }), _vm._v("\n                                        Salvar\n                                    ")])])])])])])])]) : _vm._e(), _vm._v(" "), _vm.lista && !_vm.formulario ? _c("div", {
    staticClass: "container-fluid px-4"
  }, [_c("div", {
    staticClass: "card mb-4"
  }, [_c("div", {
    staticClass: "card-header"
  }, [_vm._v("\n                    Lista de Venda\n                ")]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("table", {
    staticClass: "table table-responsive"
  }, [_vm._m(3), _vm._v(" "), _c("tbody", _vm._l(_vm.listaVenda, function (venda) {
    return _c("tr", [_c("td", [_vm._v(_vm._s(venda.cliente_id !== null ? venda.cliente.nome : "Não informado"))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(venda.funcionario.nome))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(venda.forma_pagamento.nome))]), _vm._v(" "), _c("td", [_vm._v("R$ " + _vm._s(venda.valor_total_text))]), _vm._v(" "), _c("td", [_vm._v(_vm._s(venda.parcelamento_quitado == true ? "Quitado" : "Não está quitado"))]), _vm._v(" "), _c("td", [_c("button", {
      staticClass: "btn btn-sm btn-primary",
      attrs: {
        type: "button"
      },
      on: {
        click: function click($event) {
          return _vm.formAlterar(venda.id);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-edit"
    })]), _vm._v(" "), _c("button", {
      staticClass: "btn btn-sm btn-danger",
      attrs: {
        type: "button"
      },
      on: {
        click: function click($event) {
          return _vm.excluir(venda.id);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-trash"
    })]), _vm._v(" "), _c("button", {
      staticClass: "btn btn-sm btn-success",
      attrs: {
        type: "button"
      },
      on: {
        click: function click($event) {
          return _vm.quitar(venda.id);
        }
      }
    }, [_c("i", {
      staticClass: "fa fa-check"
    })])])]);
  }), 0)])])])]) : _vm._e()])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "small text-white"
  }, [_c("i", {
    staticClass: "fas fa-angle-right"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "small text-white"
  }, [_c("i", {
    staticClass: "fas fa-angle-right"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-header"
  }, [_c("h3", {
    staticClass: "font-weight-light my-3"
  }, [_vm._v("Nova Venda")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("Cliente")]), _vm._v(" "), _c("th", [_vm._v("Funcionario")]), _vm._v(" "), _c("th", [_vm._v("Forma de Pagamento")]), _vm._v(" "), _c("th", [_vm._v("Valor Total")]), _vm._v(" "), _c("th", [_vm._v("Quitado")]), _vm._v(" "), _c("th", [_vm._v("Ações")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/filters/Dinheiro.js":
/*!******************************************!*\
  !*** ./resources/js/filters/Dinheiro.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return number_format(value, 2, ',', '.');
}

/***/ }),

/***/ "./resources/js/components/venda/Venda.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/venda/Venda.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Venda_vue_vue_type_template_id_b534b164___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Venda.vue?vue&type=template&id=b534b164& */ "./resources/js/components/venda/Venda.vue?vue&type=template&id=b534b164&");
/* harmony import */ var _Venda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Venda.vue?vue&type=script&lang=js& */ "./resources/js/components/venda/Venda.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Venda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Venda_vue_vue_type_template_id_b534b164___WEBPACK_IMPORTED_MODULE_0__.render,
  _Venda_vue_vue_type_template_id_b534b164___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/venda/Venda.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/venda/Venda.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/venda/Venda.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Venda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Venda.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/venda/Venda.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Venda_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/venda/Venda.vue?vue&type=template&id=b534b164&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/venda/Venda.vue?vue&type=template&id=b534b164& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Venda_vue_vue_type_template_id_b534b164___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Venda_vue_vue_type_template_id_b534b164___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Venda_vue_vue_type_template_id_b534b164___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Venda.vue?vue&type=template&id=b534b164& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/venda/Venda.vue?vue&type=template&id=b534b164&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./resources/js/admin/venda/app.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_venda_Venda_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/venda/Venda.vue */ "./resources/js/components/venda/Venda.vue");

var app = new Vue({
  el: '#app',
  data: {},
  components: {
    Venda: _components_venda_Venda_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});
})();

/******/ })()
;