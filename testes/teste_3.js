const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "dados.json");

function analisarFaturamento(faturamento) {
    const diasComFaturamento = faturamento.filter(d => d.valor > 0);
    const valores = diasComFaturamento.map(d => d.valor);

    const menorValor = Math.min(...valores);
    const maiorValor = Math.max(...valores);
    const mediaMensal = valores.reduce((sum, valor) => sum + valor, 0) / valores.length;

    const diasAcimaDaMedia = diasComFaturamento.filter(d => d.valor > mediaMensal).length;

    return {
        menorValor,
        maiorValor,
        mediaMensal,
        diasAcimaDaMedia
    };
}

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo JSON:", err.message);
        return;
    }

    try {
        const faturamentoMensal = JSON.parse(data);

        const resultado = analisarFaturamento(faturamentoMensal);

        console.log("Resultado da análise:");
        console.log(`- Menor valor de faturamento: R$${resultado.menorValor.toFixed(2)}`);
        console.log(`- Maior valor de faturamento: R$${resultado.maiorValor.toFixed(2)}`);
        console.log(`- Média mensal de faturamento: R$${resultado.mediaMensal.toFixed(2)}`);
        console.log(`- Dias acima da média mensal: ${resultado.diasAcimaDaMedia}`);
    } catch (parseError) {
        console.error("Erro ao processar o JSON:", parseError.message);
    }
});
