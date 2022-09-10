const mineflayer = require('mineflayer'); // importar el modulo mineflayer
 
const { mineflayer: mineflayerViewer } = require('prismarine-viewer'); // importar el modulo mineflayerViewer
 
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const Movimientos = require('mineflayer-pathfinder').Movimientos;
const { GoalNear, GoalNearXZ } = require('mineflayer-pathfinder').goals;
 
prefijo const = '!'; // prefijo del comando
 
const bot = mineflayer.createBot({ // crear el bot
    anfitrión: 'http://51.222.106.29/', // IP del servidor de Minecraft
    nombre de usuario: 'npc', // nombre de usuario de minecraft
    // contraseña: '12345678' // contraseña de minecraft, comente si desea iniciar sesión en servidores online-mode=false
    puerto: 25618, // solo se establece si necesita un puerto que no sea 25565
    versión: "1.12.2", // solo se configura si necesita una versión específica o una instantánea (es decir: "1.8.9" o "1.16.5"), de lo contrario, se configura automáticamente
    // auth: 'mojang' // solo configure si necesita autenticación de microsoft, luego configure esto en 'microsoft'
});
 
bot.loadPlugin(buscador);
 
bot.once('spawn', () => {
    // Una vez que hemos generado, es seguro acceder a mcData porque conocemos la versión
    const mcData = require('minecraft-data')(bot.version);
 
    // Una nueva instancia de movimiento para un comportamiento específico
    const defaultMove = nuevos movimientos (bot, mcData);
 
    defaultMove.allow1by1towers = false;
    defaultMove.canDig = verdadero;
    defaultMove.allowParkour = true;
    defaultMove.allowSprinting = true;
    defaultMove.scafoldingBlocks = [];
 
    defaultMove.scafoldingBlocks.push(mcData.itemsByName['dirt'].id);
 
    bot.pathfinder.setMovements(movimiento predeterminado);
 
    mineflayerViewer(bot, { puerto: 3007, primera persona: verdadero }) // el puerto es el puerto del servidor de Minecraft, si la primera persona es falsa, obtienes una vista de pájaro
});
 
bot.on('chat', (nombre de usuario, mensaje) => {
    if(nombre de usuario == bot.nombre de usuario) return;
    
    if(!message.startsWith(prefijo)) {
        devolver;
    }
    const args = mensaje.slice(prefijo.longitud).trim().split(/ +/g);
    comando const = args.shift().toLowerCase();
 
    if(comando == 'di') {
        bot.chat(args.join(' '));
    }
    if(comando == 'ven') {
        const target = bot.jugadores[nombre de usuario] ? bot.jugadores[nombre de usuario].entidad: nulo;
        si (! objetivo) {
            bot.chat('No te puedo ver, no se donde estas, prueba de entrar detro de mis chunks o acercarte mas a mi');
            devolver;
        }
        const jugador = objetivo.posición;
        bot.pathfinder.setGoal(new GoalNear(jugador.x, jugador.y, jugador.z, 1));
    }
    if(comando == 'ir a') {
        const x = parseInt(argumentos[0]);
        const y = parseInt(argumentos[1]);
        const z = parseInt(argumentos[2]);
        bot.pathfinder.setGoal(new GoalNear(x, y, z, 1));
    }
    if(comando == 'xz') {
        const x = parseInt(argumentos[0]);
        const z = parseInt(argumentos[1]);
        bot.pathfinder.setGoal(new GoalNearXZ(x, z, 1));
    }
});
 
// Muestra los errores en la consola o motivos de expulsión
bot.on('expulsado', console.log);
bot.on('error', consola.log);
