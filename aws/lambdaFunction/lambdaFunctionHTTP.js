export const handler = async (event) => {
    const method = event.requestContext?.http?.method || event.httpMethod;

    // --- 1. Logic: Perform Calculation (POST) ---
    if (method === 'POST') {
        const params = new URLSearchParams(
            event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body
        );

        const num1 = parseFloat(params.get('num1'));
        const num2 = parseFloat(params.get('num2'));
        const operation = params.get('operation');
        let result = 0;

        switch (operation) {
            case 'add': result = num1 + num2; break;
            case 'subtract': result = num1 - num2; break;
            case 'multiply': result = num1 * num2; break;
            case 'divide': result = num2 !== 0 ? num1 / num2 : "Error (Div by 0)"; break;
            default: result = "Invalid Operation";
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: renderHTML(result, num1, num2)
        };
    }

    // --- 2. Logic: Serve Initial Page (GET) ---
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: renderHTML()
    };
};

// Function to keep the HTML separate and clean
function renderHTML(result = null, n1 = '', n2 = '') {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Lambda Calculator</title>
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; padding-top: 50px; background: #f4f4f9; }
            .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; }
            input, select, button { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
            button { background: #007bff; color: white; border: none; cursor: pointer; font-weight: bold; }
            button:hover { background: #0056b3; }
            .result { background: #e7f3ff; padding: 10px; border-radius: 4px; text-align: center; font-weight: bold; color: #007bff; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>Lambda Calc</h2>
            <form method="POST">
                <input type="number" name="num1" step="any" placeholder="First Number" value="${n1}" required />
                <select name="operation">
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="multiply">×</option>
                    <option value="divide">÷</option>
                </select>
                <input type="number" name="num2" step="any" placeholder="Second Number" value="${n2}" required />
                <button type="submit">Calculate</button>
            </form>
            ${result !== null ? `<div class="result">Result: ${result}</div>` : ''}
        </div>
    </body>
    </html>
    `;
}