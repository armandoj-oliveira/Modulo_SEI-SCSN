const urlAuth = "https://spp.go.senac.br/api/test/sei/msAuth";
const urlResponseChat = "https://spp.go.senac.br/api/test/sei/responseChat";
const urlFirst = "https://spp.go.senac.br/api/test/sei/first";

async function fetchWithTimeout(url, timeout = 3000) {
    const fetchPromise = fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    });

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tempo limite excedido")), timeout)
    );

    try {
        const data = await Promise.race([fetchPromise, timeoutPromise]);
        console.log("Dados recebidos:", data);
        return data.status;
    } catch (error) {
        errorModal("Erro", error.message);
        return null;
    }
}

function btnActionAutenticate() {
    const btnMicrosoft = document.getElementById('btnMicrosoft');

    if (btnMicrosoft) {
        btnMicrosoft.addEventListener("click", function () {
            loadingModal();
        });
    } else {
        errorModal("Algo deu errado!");
    }
}

function btnActionAnalyze() {
    const btnAnalyze = document.getElementById('btnAnalyze')
    
    if(btnAnalyze) {
        btnAnalyze.addEventListener("click", function () {
            window.alert("DEU CERTO");
        });
    } else {
        errorModal("Algo deu errado!");
    }
}

function renderAnalysisHistory() {
    const tableContainer = document.getElementById("tableAnalyze");
    if (tableContainer.hasChildNodes()) {
        return;
    }

    const tableStyle = `
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    `;
    
    const thTdStyle = `
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    `;

    const thStyle = `
        background-color: #f4f4f4;
    `;

    const analysisHistory = [ 
        { docName: "Memorando Exemplo", docStatus: "Analisado", timestamp: "2024-10-01 14:30", link: "https://example.com/memorando" },
        { docName: "Termo de Referência Exemplo", docStatus: "Não analisado", timestamp: "", link: "https://example.com/termo" }
    ];

    const table = document.createElement("table");
    table.style = tableStyle;

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Link da Análise", "Status", "Data/Hora"].forEach(headerText => {
        const th = document.createElement("th");
        th.style = thTdStyle + thStyle;
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    analysisHistory.forEach(analysis => {
        const row = document.createElement("tr");

        ["docName", "docStatus", "timestamp"].forEach((key, index) => {
            const td = document.createElement("td");
            td.style = thTdStyle;

            if (key === "docName") {
                const link = document.createElement("a");
                link.href = analysis.link;
                link.target = "_blank";
                link.textContent = analysis[key];
                link.style = "color: #007bff; text-decoration: underline; cursor: pointer;";
                td.appendChild(link);
            } else {
                td.textContent = analysis[key];
            }

            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    tableContainer.appendChild(table);
}