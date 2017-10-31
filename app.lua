local json = require "cjson"
local file = require "pl.file"
local pretty = require "pl.pretty"

local content = file.read(arg[1])
local data, err = json.decode(content)

print(#data.funcionarios)

function showname(funcionarios)
    local ret = ""

    for _, f in ipairs(funcionarios) do
        ret = ret .. " " .. f.nome .. " " .. f.sobrenome .. ","
    end

    return ret
end

local report = {
    departamentos = {},
    departamentos_data = {},
    max_d = 0,
    min_d = 999999999999999,
    max_d_n = {},
    min_d_n = {},
    total = 0,
    max = 0,
    max_f = {},
    min = 9999999999999,
    min_f = {},
    media = 0,
    sobrenomes_data = {},
}

function processaQuestao2(f)
    if (f.salario == report.departamentos_data[f.area].max) then
        table.insert(report.departamentos_data[f.area].max_f, f.nome .. " " .. f.sobrenome)
    end

    if (f.salario > report.departamentos_data[f.area].max) then
        report.departamentos_data[f.area].max_f = {f.nome .. " ".. f.sobrenome}
        report.departamentos_data[f.area].max = f.salario
    end

    if (f.salario == report.departamentos_data[f.area].min) then
        table.insert(report.departamentos_data[f.area].min_f,f.nome .. " ".. f.sobrenome)
    end

    if (f.salario < report.departamentos_data[f.area].min) then
        report.departamentos_data[f.area].min_f = {f.nome .. " ".. f.sobrenome}
        report.departamentos_data[f.area].min = f.salario
    end
end 

function processaQuestao4(f)
  if (f.salario == report.sobrenomes_data[f.sobrenome].max) then
        table.insert(report.sobrenomes_data[f.sobrenome].max_f, f.nome .. " ".. f.sobrenome)
    end

    if (f.salario > report.sobrenomes_data[f.sobrenome].max) then
        report.sobrenomes_data[f.sobrenome].max_f = {f.nome .. " ".. f.sobrenome}
        report.sobrenomes_data[f.sobrenome].max = f.salario
    end
end


for _, f in ipairs(data.funcionarios) do 

    -- Geral
    report.departamentos[f.area] = report.departamentos[f.area] or 0
    report.departamentos[f.area] = report.departamentos[f.area] + 1
    report.total = report.total + 1
    report.media = report.media + f.salario

    if (f.salario == report.max) then
        table.insert(report.max_f, f.nome .. " " .. f.sobrenome)
    end

    if (f.salario > report.max) then
        report.max = f.salario
        report.max_f = {f.nome .. " " .. f.sobrenome}
    end

    if (f.salario == report.min) then
        table.insert(report.min_f, f.nome .. " " .. f.sobrenome)
    end

    if (f.salario < report.min) then
        report.min = f.salario
        report.min_f = {f.nome .. " " .. f.sobrenome}
    end

    -- Departamentos
    if report.departamentos_data[f.area] == nil then
        report.departamentos_data[f.area] = { total = 0, media = 0, max = 0, max_f = {}, min = 99999999, min_f = {} }
    end
    report.departamentos_data[f.area].total = report.departamentos_data[f.area].total + 1
    report.departamentos_data[f.area].media = report.departamentos_data[f.area].media + f.salario

    processaQuestao2(f)

    -- Sobrenomes
    report.sobrenomes_data[f.sobrenome] = report.sobrenomes_data[f.sobrenome] or { total = 0, max = 0, max_f = {} }
    report.sobrenomes_data[f.sobrenome].total = report.sobrenomes_data[f.sobrenome].total + 1

    processaQuestao4(f)
end

report.media = report.media / report.total

for k, d in pairs(report.departamentos_data) do
    report.departamentos_data[k] = { 
        total = d.total, 
        media = (d.media / d.total), 
        max = 0, 
        max_f = "",
        min = 99999999, 
        min_f = "" 
    }
end

-- Questao 3
for d, q in pairs(report.departamentos) do 
    if (q == report.max_d) then
        table.push(report.max_d_n, d)
    end

    if (q > report.max_d) then
        report.max_d_n = {d}
        report.max_d = q;
    end

    if (q == report.min_d) then
        table.push(report.min_d_n, d)
    end

    if (q < report.min_d) then
        report.min_d_n = {d}
        report.min_d = q
    end
end

--print(pretty.write(report))

print("Media salarial: " .. report.media)
print("Maior salario: " .. report.max .. " de " .. pretty.write(report.max_f))
print("Menor salario: " .. report.min .. " de " .. pretty.write(report.min_f))

print("Departamento com a menor quantidade de funcionários: " .. report.min_d .. " de " .. pretty.write(report.min_d_n))
print("Departamento com a maior quantidade de funcionários: " .. report.max_d .. " de " .. pretty.write(report.max_d_n))

for k, h in pairs(report.departamentos_data) do
    print("AREA: " .. k)
    print("Media salarial: " .. h.media)
    print("Maior salario: " .. h.max .. " de " .. pretty.write(h.max_f))
    print("Menor salario: " .. h.min .. " de " .. pretty.write(h.min_f))
end


for k, h in pairs(report.sobrenomes_data) do
    print("SOBRENOME: " .. k)
    print("Maior salario: " .. h.max .. " de " .. pretty.write(h.max_f))
end

