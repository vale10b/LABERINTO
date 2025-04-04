document.addEventListener("DOMContentLoaded", function () {
    const maze = document.getElementById("maze");
    let player, goal, walls;
    let playerX, playerY;
    const step = 10;
    let currentLevel = 0;

    const levels = [
        {
            playerStart: { x: 10, y: 10 },
            goalPos: { x: 470, y: 270 },
            walls: [
                { top: 50, left: 50, width: 400, height: 20 },
                { top: 100, left: 100, width: 20, height: 150 },
                { top: 250, left: 100, width: 300, height: 20 },
                { top: 50, left: 400, width: 20, height: 200 }
            ]
        },
        {
            playerStart: { x: 10, y: 10 },
            goalPos: { x: 470, y: 270 },
            walls: [
                { top: 0, left: 100, width: 20, height: 250 },
                { top: 50, left: 200, width: 300, height: 20 },
                { top: 150, left: 50, width: 350, height: 20 },
                { top: 200, left: 400, width: 20, height: 100 }
            ]
        },
        {
            playerStart: { x: 10, y: 10 },
            goalPos: { x: 470, y: 270 },
            walls: [
                { top: 50, left: 50, width: 400, height: 20 },
                { top: 150, left: 50, width: 20, height: 150 },
                { top: 200, left: 100, width: 350, height: 20 },
                { top: 100, left: 250, width: 20, height: 100 }
            ]
        }
    ];

    function loadLevel(level) {
        maze.innerHTML = ""; // Limpia el laberinto
        const levelData = levels[level];

        // Crear jugador
        player = document.createElement("div");
        player.id = "player";
        player.style.left = levelData.playerStart.x + "px";
        player.style.top = levelData.playerStart.y + "px";
        maze.appendChild(player);
        playerX = levelData.playerStart.x;
        playerY = levelData.playerStart.y;

        // Crear meta
        goal = document.createElement("div");
        goal.id = "goal";
        goal.style.left = levelData.goalPos.x + "px";
        goal.style.top = levelData.goalPos.y + "px";
        maze.appendChild(goal);

        // Crear paredes
        walls = [];
        levelData.walls.forEach(wallData => {
            let wall = document.createElement("div");
            wall.classList.add("wall");
            wall.style.top = wallData.top + "px";
            wall.style.left = wallData.left + "px";
            wall.style.width = wallData.width + "px";
            wall.style.height = wallData.height + "px";
            maze.appendChild(wall);
            walls.push(wall);
        });
    }

    function checkCollision(x, y) {
        for (let wall of walls) {
            let wallRect = wall.getBoundingClientRect();
            let playerRect = { left: x, top: y, right: x + 20, bottom: y + 20 };

            if (
                playerRect.right > wallRect.left &&
                playerRect.left < wallRect.right &&
                playerRect.bottom > wallRect.top &&
                playerRect.top < wallRect.bottom
            ) {
                alert("¡Chocaste! Reiniciando nivel...");
                loadLevel(currentLevel);
                return true;
            }
        }
        return false;
    }

    function movePlayer(dx, dy) {
        let newX = playerX + dx;
        let newY = playerY + dy;

        if (!checkCollision(newX, newY)) {
            playerX = newX;
            playerY = newY;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
        }

        let playerRect = player.getBoundingClientRect();
        let goalRect = goal.getBoundingClientRect();

        if (
            playerRect.left === goalRect.left &&
            playerRect.top === goalRect.top
        ) {
            if (currentLevel < levels.length - 1) {
                alert("¡Nivel completado! Pasando al siguiente nivel...");
                currentLevel++;
                loadLevel(currentLevel);
            } else {
                alert("🎉 ¡Ganaste el juego! 🎉");
                location.reload();
            }
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp") movePlayer(0, -step);
        if (event.key === "ArrowDown") movePlayer(0, step);
        if (event.key === "ArrowLeft") movePlayer(-step, 0);
        if (event.key === "ArrowRight") movePlayer(step, 0);
    });

    loadLevel(currentLevel);
});
