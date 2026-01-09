<!DOCTYPE html>
<html>
<head>
    <title>PIKACHU SESSION</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #000; color: #ff0; font-family: sans-serif; text-align: center; padding: 20px; }
        .box { border: 2px solid #ff0; padding: 20px; border-radius: 15px; max-width: 400px; margin: auto; }
        input { padding: 12px; border-radius: 5px; width: 80%; margin-bottom: 10px; }
        button { padding: 12px 25px; background: #ff0; border: none; font-weight: bold; border-radius: 5px; }
        #codeDisplay { font-size: 35px; margin-top: 20px; color: #fff; font-weight: bold; }
    </style>
</head>
<body>
    <div class="box">
        <h1>🃏 PIKACHU 🃏</h1>
        <p>Developed by Seonghoon</p>
        <input type="text" id="number" placeholder="Example: 923001234567">
        <br>
        <button onclick="getCode()">GET PAIRING CODE</button>
        <div id="codeDisplay"></div>
    </div>
    <script>
        async function getCode() {
            const num = document.getElementById('number').value;
            const display = document.getElementById('codeDisplay');
            if(!num) return alert("Enter number!");
            display.innerText = "GENERATING...";
            const res = await fetch(`/code?number=${num}`);
            const data = await res.json();
            display.innerText = data.code || "ERROR";
        }
    </script>
</body>
</html>
