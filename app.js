/**
 * Desafio 05
 * https://osprogramadores.com/desafios/d05/
 * 
 * autor: andre@andregarzia.com
 */

'use strict'

let app = {
    loading: false,
    data: {},
    report: {
        departamentos: {},
        departamentos_data: {},
        max_d: 0,
        min_d: 999999999999999,
        max_d_n: "",
        min_d_n: "",
        total: 0,
        max: 0,
        max_f: [],
        min: 9999999999999,
        min_f: [],
        media: 0,
        sobrenomes_data: [],
    },

    changeFileInputCallback: ev => {
        console.time("tempo total");
        console.time("lendo arquivo");
        app.loading = true;
        let reader = new FileReader();
        reader.onload = app.readerLoadCallback;
        reader.readAsText(ev.target.files[0]);
        console.timeEnd("lendo arquivo");
    },

    readerLoadCallback: ev => {
        console.time("json parsing");
        app.data = JSON.parse(ev.target.result);
        console.timeEnd("json parsing");
        console.log("total", app.data.funcionarios.length);
        app.loading = false;
        console.time("processa dados");
        app.processaDados();
        console.timeEnd("processa dados");
        m.redraw();
        console.timeEnd("tempo total");
    },

    processaQuestao2: (f) => {
        if (f.salario == app.report.departamentos_data[f.area].max) {
            app.report.departamentos_data[f.area].max_f.push(`${f.nome} ${f.sobrenome}`);
        }

        if (f.salario > app.report.departamentos_data[f.area].max) {
            app.report.departamentos_data[f.area].max_f = [`${f.nome} ${f.sobrenome}`];
            app.report.departamentos_data[f.area].max = f.salario;
        }

        if (f.salario == app.report.departamentos_data[f.area].min) {
            app.report.departamentos_data[f.area].min_f.push(`${f.nome} ${f.sobrenome}`);
        }

        if (f.salario < app.report.departamentos_data[f.area].min) {
            app.report.departamentos_data[f.area].min_f = [`${f.nome} ${f.sobrenome}`];
            app.report.departamentos_data[f.area].min = f.salario;
        }
    },

    processaQuestao4: (f) => {
        if (f.salario == app.report.sobrenomes_data[f.sobrenome].max) {
            app.report.sobrenomes_data[f.sobrenome].max_f.push(`${f.nome} ${f.sobrenome}`);
        }

        if (f.salario > app.report.sobrenomes_data[f.sobrenome].max) {
            app.report.sobrenomes_data[f.sobrenome].max_f = [`${f.nome} ${f.sobrenome}`];
            app.report.sobrenomes_data[f.sobrenome].max = f.salario;
        }
    },

    processaDados: () => {
        let l = app.data.funcionarios.length;
        while (l--) {
            let f = app.data.funcionarios[l];

            app.report.departamentos[f.area] = app.report.departamentos[f.area] || 0;
            app.report.departamentos[f.area]++;
            app.report.total++;
            app.report.media += f.salario;

            if (f.salario == app.report.max) {
                app.report.max_f.push(`${f.nome} ${f.sobrenome}`);
            }

            if (f.salario > app.report.max) {
                app.report.max_f = [`${f.nome} ${f.sobrenome}`];
                app.report.max = f.salario;
            }

            if (f.salario == app.report.min) {
                app.report.min_f.push(`${f.nome} ${f.sobrenome}`);
            }

            if (f.salario < app.report.min) {
                app.report.min_f = [`${f.nome} ${f.sobrenome}`];
                app.report.min = f.salario;
            }

            // departamentos
            app.report.departamentos_data[f.area] = app.report.departamentos_data[f.area] || { total: 0, media: 0, max: 0, max_f: "", min: 99999999, min_f: "" };
            app.report.departamentos_data[f.area].total++;
            app.report.departamentos_data[f.area].media += f.salario;

            app.processaQuestao2(f);

            // sobrenomes
            app.report.sobrenomes_data[f.sobrenome] = app.report.sobrenomes_data[f.sobrenome] || { total: 0, max: 0, max_f: "" };
            app.report.sobrenomes_data[f.sobrenome].total++;

            app.processaQuestao4(f);
        }

        app.report.media /= app.report.total;

        for (let k in app.report.departamentos_data) {
            let d = app.report.departamentos_data[k];
            app.report.departamentos_data[k] = { total: d.total, media: (d.media / d.total), max: 0, max_f: "", min: 99999999, min_f: "" }
        };

        // Questão 3

        for (let d in app.report.departamentos) {
            let q = app.report.departamentos[d];

            if (q == app.report.max_d) {
                app.report.max_d_n.push(`${d}`);
            }

            if (q > app.report.max_d) {
                app.report.max_d_n = [`${d}`];
                app.report.max_d = q;
            }

            if (q == app.report.min_d) {
                app.report.min_d_n.push(`${d}`);
            }

            if (q < app.report.min_d) {
                app.report.min_d_n = [`${d}`];
                app.report.min_d = q;
            }
        }
    },

    view: vnode => {
        return [
            m("h1", "Desafio 05"),
            m("input", { type: "file", onchange: app.changeFileInputCallback }),
            m("br"),
            app.loading ? m("span", "carregando...") : "",
            app.report.max > 0 ? m(report, { data: app.report }) : ""
        ]
    }
}

let report = {
    item: (label, data) => {
        return m("p", [
            m("b", `${label}: `),
            m("span", data)
        ]);
    },
    departamentos: (d) => {
        let ret = []
        for (let k in d.departamentos_data) {
            let h = d.departamentos_data[k];
            ret.push([
                m("h3", `Área ${k}`),
                report.item("Média salarial", Math.round(h.media, 2)),
                report.item("Maior salário", h.max),
                report.item("Funcionários com o maior salário", h.max_f),
                report.item("Menor salário", h.min),
                report.item("Funcionários com menor salário", h.min_f),
                m("hr"),
            ])
        }
        return ret;
    },
    sobrenomes: (d) => {
        let ret = []
        for (let k in d.sobrenomes_data) {
            let h = d.sobrenomes_data[k];
            ret.push([
                m("h3", `Sobrenome ${k}`),
                report.item("Maior salário", h.max),
                report.item("Funcionários com o maior salário", h.max_f),
                m("hr"),
            ])
        }
        return ret;
    },
    view: vnode => {
        let d = vnode.attrs.data;
        return [
            m("h2", "Resultado"),
            report.item("total de funcionários", d.total),
            report.item("Média salarial", Math.round(d.media, 2)),
            m("hr"),
            report.item("Maior salário", d.max),
            report.item("Funcionários com o maior salário", d.max_f.join(", ")),
            m("hr"),
            report.item("Menor salário", d.min),
            report.item("Funcionários com menor salário", d.min_f.join(", ")),
            m("hr"),
            report.item("Menor quantidade de funcionários ", d.min_d),
            report.item("Departamento com a menor quantidade de funcionários", d.min_d_n),
            m("hr"),
            report.item("Maior quantidade de funcionários ", d.max_d),
            report.item("Departamento com a maior quantidade de funcionários", d.max_d_n),
            m("hr"),
            report.departamentos(d),
            m("hr"),
            report.sobrenomes(d)
        ]
    }
}

m.mount(document.body, app);
