//_`* Ola! Mundo.
//_`* Bom vamos começar, Base totalmente feita por mim "Tobi"
//_`* Agradeço a meus amigos:
//_`* yLucas
//_`* Thiaho
//_`* Kirishima
//_`* Como eu esqueci o nome do indonésio que fez essa base.
//_`* Não vou colocar os cretidos dele agora, Mas na próxima atualização
//_`* Provavelmente colocarei...
//_`* Quem não gostar do bot, fale comigo.
//_`* Quem quiser fazer parceria tbm pode falar comigo
//_`* É isso lindos, agradeço a todos q estão me ajudando

//_WHATSAPP WEB
 const {
 WAConnection,
 MessageType,
 Presence,
 Mimetype,
 GroupSettingChange,
 MessageOptions,
 WALocationMessage,
 WA_MESSAGE_STUB_TYPES,
 ReconnectMode,
 ProxyAgent,
 waChatKey,
 mentionedJid,
 processTime,
 ChatModification,
} = require('@adiwajshing/baileys');

//_PACOTES NPM
const fs = require('fs');
const moment = require('moment-timezone');
const {exec} = require('child_process');
const kagApi = require('@kagchi/kag-api');
const fetc = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const {removeBackgroundFromImageFile} = require('remove.bg');
const imgbb = require('imgbb-uploader');
const lolis = require('lolis.life');
const loli = new lolis();
const speed = require('performance-now');
const cd = 4.32e+7 ;
const crypto = require('crypto');
const qrcode = require("qrcode-terminal");
const axios = require('axios');

//_ARQUIVOS NA PASTA LIB
const {fetchJson} = require('./lib/fetcher');
const {recognize} = require('./lib/ocr');
const {color, bgcolor} = require('./lib/color');
const { addMetadata } = require('./lib/exif.js')
const { webp2gifFile } = require("./lib/gif.js")
const {wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, banner2, start, info, success, clos } = require('./lib/functions');

//_ARQUIVOS NA PASTA HELP
const { help } = require('./base de dados/help/help')

//_ARQUIVOS NA PASTA DATA, JSON. 
const up = JSON.parse(fs.readFileSync('./base de dados/data/settings.json'));
const { ptbr } = require('./base de dados/mess')

//_BANCO DE AMARZENAMENTO 
const setiker = JSON.parse(fs.readFileSync('./base de dados/temp/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./base de dados/temp/vid.json'))
const audionye = JSON.parse(fs.readFileSync('./base de dados/temp/vn.json'))
const imagenye = JSON.parse(fs.readFileSync('./base de dados/temp/image.json'))

//_PASTAS EM BASE DE DADOS
const sotoy = JSON.parse(fs.readFileSync('./base de dados/data/sotoy.json'))
const ban = JSON.parse(fs.readFileSync('./base de dados/datauser/banned.json'));
const prem = JSON.parse(fs.readFileSync('./base de dados/datauser/premium.json'));

//_ ARQUIVOS ANTIS:
const welcome = JSON.parse(fs.readFileSync('./base de dados/arquivos/welcome.json'));

//_DEFINIÇÕES
SeuNome = 'STARONEBOT' //Ex: Coloque seu nome pequeno, Esse "Tobi", Fica como cretidos na figurinha
p = up.p 
const memberlimit = up.memberlimit;
const cr = up.cr;
const NamaBot = up.NamaBot;
const blocked = [];
const ownerNumber = up.ownerNumber;

//_NUMERO DO DONO DO BOT
const vcard = 'BEGIN:VCARD\n'
+ 'VERSION:3.0\n'
+ 'FN:Tobi\n' // Nome
+ 'ORG:${NamaBot};\n' // Nome do bot
+ 'TEL;type=CELL;type=VOICE;waid=559481417512:+55 94 8141-7512\n' // Seu n?mero
+ 'END:VCARD' 

//_TEMPO ONLINE
function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var second = Math.floor(seconds % 60);
return `${pad(hours)}:${pad(minutes)}:${pad(second)}`;
}
//_FIM 

//_WHATSAPP CONEX?O, QR CODE
async function starts() {
const tobi = new WAConnection()
tobi.logger.level = 'warn'
console.log(banner.string) //_BANNER
console.log(banner2.string) //_BANNER
tobi.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
})

fs.existsSync('./tobi.json') && tobi.loadAuthInfo('./tobi.json')
tobi.on('connecting', () => {
start('2', 'Aguarde...')
})
tobi.on('open', () => {
success('2', 'Foi conectado!!!')
})
await tobi.connect({timeoutMs: 30*1000})
fs.writeFileSync('./tobi.json', JSON.stringify(tobi.base64EncodedAuthInfo(), null, '\t'))
//_FIM DO WHATSAPP CONEX?O.

//_WELCOME = BEM VINDO...
tobi.on('group-participants-update', async (anu) => {
if (!welcome.includes(anu.jid)) return
try {
const mdata = await tobi.groupMetadata(anu.jid)
console.log(anu)
if (anu.action == 'add') {
num = anu.participants[0]
try {
ppimg = await tobi.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `Olá @${num.split('@')[0]}!!
Bem-vindo(a) ao grupo ${mdata.subject}! Olhe as regras do grupo para não ser banido 

Use o comando ${p}menu para listar meus comandos

Leia As Regras Do Grupo:
${mdata.desc}`
let buff = await getBuffer(ppimg)
tobi.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppimg = await tobi.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `SAIU E NEM PAGOU A COCA  @${num.split('@')[0]} 👋`
let buff = await getBuffer(ppimg)
tobi.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
//_FIM 

//_BLOQUEADOS, "BLOKLIST"
tobi.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))
}
})

//_LINGUAGEM DO BOT, "N MEXA EM NADA."
tobi.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (mek.key.fromMe) return
global.p
global.blocked
//_HORAS
const hr = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const data = moment.tz('Asia/Jakarta').format('DD/MM')
//-•-\\
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const type = Object.keys(mek.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
body = (type === 'conversation' && mek.message.conversation.startsWith(p)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(p) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(p) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(p) ? mek.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(p)
const is = budy.slice(0).trim().split(/ +/).shift().toLowerCase()

//_REPLY DO BOT
mess = {
wait: 'Aguarde um pouco...',
limitend: '『❗』Desculpe, seu limite acabou, por favor, fa?a uma compra repetida.',
error: {
stick: '『❗』Por favor, tente novamente mais tarde',
},
only: {
group: '『❗』Comando só para grupo irmão',
ownerG: '『❗』Este comando so pode ser usado pelo dono do bot',
ownerB: '『❗』So quem pode usar esse comando eo dono do bot',
admin: '『❗』Esse comando é só para admins',
Badmin: '『❗』Cade meu adm???',
tobirply: `『❗』Comando ${command} ja esta ativado!`,
tobireplayoff: `『❗』Comando ${command} desativado com sucesso!`,
tobireplay: `『❗』Comando ${command} ativado com sucesso!`,
tobantilink: '『❗』Opa amigo, E esse link aí?🧐',
daftarB: `『❗』Salve, Fdp *${p}verify* para come?ar a usar bot`,
}
}

const totalchat = await tobi.chats.all()
const botNumber = tobi.user.jid
const ownerNumber = [`${up.ownerNumber}@s.whatsapp.net`] //SUBSTITUA ISSO PELO SEU N?MERO
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? mek.participant : mek.key.remoteJid
const groupMetadata = isGroup ? await tobi.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isOwner = ownerNumber.includes(sender)
const isBanned = ban.includes(sender) 
const q = args.join(' ')
const tescuk = ["0@s.whatsapp.net"]
let pushname = tobi.contacts[sender] != undefined ? tobi.contacts[sender].vname || tobi.contacts[sender].notify: undefined
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
// ARQUIVOS ANTIS 
const isWelcome = isGroup ? welcome.includes(from) : true //Welcome

//_REPOSTA DE BOT
const enviar = (teks) => {				
tobi.sendMessage(from, teks, text, {quoted:mek})
}
const sendMess = (hehe, teks) => {
tobi.sendMessage(hehe, teks, text)
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? tobi.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : tobi.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
}

const costum = (pesan, tipe, target, target2) => {
tobi.sendMessage(from, pesan, tipe, {quoted: {key: {fromMe: false, participant: `${target}`, ...(from ? {
remoteJid: from
}: {})
}, message: {
conversation: `${target2}`
}}})
}

const sendPtt = (teks) => {
tobi.sendMessage(from, audio, mp3, {
quoted: mek 
})
}

//_TIPOS DE MENSAGENS
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedText = type === 'extendedTextMessage' && content.includes('textMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
//_FIM 

//COLORES NO TERMINAL "TERMUX"
colors = ['red','white','black','blue','yellow','green']

//_VISUALIZA AS MENSAGENS 
tobi.chatRead(from)

//_USUÁRIO BANIDO
if (isCmd && isBanned) {
enviar(`『❗』Você está banido do bot`)
return console.log(color('[BAN] Ignorando comando', 'blue'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), color(`${command}`),'DE:', color(pushname))}

//_CONSOLE DE COMANDOS NO PRIVADO
if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', color(command, "yellow"), 'do', color(pushname, "yellow"), 'horas', color(hr, "yellow"))
//_CONSOLE DE MENSAGENS NO PRIVADO
if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MSG \x1b[1;37m]', color('Message', "yellow"), 'do', color(pushname, "yellow"), 'horas', color(hr, "yellow"))
//_CONSOLE DE COMANDOS EM GRUPOS 
if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', color(command, "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName), 'horas', color(hr, "yellow"))
//_CONSOLE DE MENSAGENS EM GRUPOS
if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MSG \x1b[1;37m]', color('Message', "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName), 'horas', color(hr, "yellow"))
//_FIM 

//_> UPAR COMANDOS "EVAL"
if (budy.startsWith('>')){
if(!isOwner) return
console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m EVAL \x1b[1;37m]', color(moment(mek.messageTimestamp * 1000).format('DD/MM HH:mm:ss'), 'yellow'), color(budy))
try {
return enviar(JSON.stringify(eval(budy.slice(2)),null,'\t'))
} catch(e) {
enviar(`${e}`)
}
}

//_LIMITE PARA MEMBROS
if (isGroup) {
try {
const getmemex = groupMembers.length
if (getmemex <= memberlimit) {
tobi.sendMessage(from, `Desculpe, os requisitos de membro devem estar acima ${memberlimit}, Adeus ??`, text)
setTimeout(() => {
tobi.groupLeave(from) // ur cods
}, 5000) // 1000 = 1s,
}
} catch {
console.error(err)
}
}
//_FIM 

//_PALAVRAS ALEATÓRIAS
switch(is) {
case 'bot':
buf = fs.readFileSync(`./base de dados/temp/audio/onichan.mp3`)
tobi.sendMessage(from, buf, audio, {
mimetype: 'audio/mp4', quoted: mek, ptt: true
})
break

case 'help':
case 'menu':
hasil = `        
Salve *${pushname}* tente digitar ${p}menu`
enviar(hasil)
break
}
//_FIM 

//_ONDE COMEÇA TODOS OS COMANDOS.
switch(command) {
case 'help': 
case 'menu':
case 'ajuda':
uptime = process.uptime()
wew = fs.readFileSync('./src/menu.png')
tobi.sendMessage(from, wew, image, {quoted: mek, thumbnail:null, caption: help(p, hr)})
break

case 'dono':
case 'criador':
case 'owner':
tobi.sendMessage(from, '『❗』Numero do meu criador foi enviado no seu pv',MessageType.text, { quoted: mek} )
tobi.sendMessage(sender, 'ESTE E MEU CRIADOR [(>_<)] CASO TENHA ALGUMA DUVIDA FALE COM ELE ?',MessageType.text, { quoted: mek} )
tobi.sendMessage(sender, {
displayname: "Jeff", vcard: vcard
}, MessageType.contact, {
quoted: mek
})
break

case 'banir':
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot //_`Pedi adm, para o bot
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return enviar('A marca-alvo que você quer chutar!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Alvo removido com sucesso :\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
tobi.groupRemove(from, mentioned)
} else {
mentions(`Alvo removido com sucesso : @${mentioned[0].split('@')[0]}`, mentioned, true)
tobi.groupRemove(from, mentioned)
}
break

case 'add':
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot //_`Pedi adm, para o bot
if (args.length < 1) return enviar('Você quer adicionar um gênio?')
if (args[0].startsWith('08')) return enviar('Use o código do país, man')
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
tobi.groupAdd(from, [num])
} catch (e) {
console.log('Error :', e)
enviar('Falha ao adicionar destino, talvez porque é privado')
}
break

case 'promover': //Grupo
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot //_`Pedi adm, para o bot
if (args.length < 1) return enviar(`Use: ${p + command} @Alvo`)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Berhasil Promote\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(from, mentioned, true)
tobi.groupRemove(from, mentioned)
} else {
mentions(`Ok, chefe. esse cara aqui: @${mentioned[0].split('@')[0]} agora é admin do grupo!`, mentioned, true)
tobi.groupMakeAdmin(from, mentioned)
}
break

case 'rebaixar': //Grupo
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot //_`Pedi adm, para o bot
if (args.length < 1) return enviar(`Use: ${p + command} @Alvo`)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Berhasil Demote\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
tobi.groupRemove(from, mentioned)
} else {
mentions(`Ok, chefe. esse cara aqui: @${mentioned[0].split('@')[0]} perdeu o adm com sucesso!`, mentioned, true)
tobi.groupDemoteAdmin(from, mentioned)
}
break

case 'abrir-grupo': //Grupo
case 'abrir-gp':
case 'abrirg':
case 'abrir':
case 'abrir-gc':
tobi.updatePresence(from, Presence.composing)
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
open = {
text: `Grupo aberto por: @${sender.split("@")[0]}`,
contextInfo: {
mentionedJid: [sender]
}
}
tobi.groupSettingChange (from, GroupSettingChange.messageSend, false)
tobi.sendMessage(from, open, text, {
quoted: mek
})
break

case 'fecharg': //Grupo
case 'fechar':
case 'fechagrupo':
case 'fechar-gp':
tobi.updatePresence(from, Presence.composing)
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
var nomor = mek.participant
const close = {
text: `Grupo fechado por: @${nomor.split("@s.whatsapp.net")[0]}`,
contextInfo: {
mentionedJid: [nomor]
}
}
tobi.groupSettingChange (from, GroupSettingChange.messageSend, true);
enviar(close)
break

case 'totag':
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
encmediau = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, sticker, options)
fs.unlinkSync(file)
} else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
encmediau = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, image, options)
fs.unlinkSync(file)
} else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
encmediau = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'audio/mp4', duration: 999999999,
ptt : true,
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, audio, options)
fs.unlinkSync(file)
 } else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'video/gif',
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, video, options)
fs.unlinkSync(file)
} else if ((isMedia && !mek.message.videoMessage || isQuotedDocument) && args.length == 0) {
encmediau = isQuotedDocument ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'text/plain',
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, document, options)
fs.unlinkSync(file)
}  else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
encmediau = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmediau, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'video/mp4', duration: 999999999,
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, video, options)
fs.unlinkSync(file)
} else{
enviar(`『❗』Responder imagem/documento/gif/adesivo/áudio/vídeo com legenda ${p + command}`)
}
break

case 'setname': //Grupo
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
if (args.length < 1) return enviar(`『❗』Use: ${p + command} Novo Nome Do Grupo`)
idgrup = `${from.split("@s.whatsapp.net")[0]}`;
tobi.groupUpdateSubject(idgrup, `${body.slice(9)}`)
tobi.sendMessage(from, '『❗』Nome do grupo alterado', text, {
quoted: mek
})
break

case 'setdesk': //Grupo
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
if (args.length < 1) return enviar(`『❗』Use: ${p + command} Nova Descrição`)
tobi.groupUpdateDescription(from, `${body.slice(9)}`)
tobi.sendMessage(from, '『❗』Descrição do grupo alterada', text, {
quoted: mek
})
break

case 'setppgc': //Grupo
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
if (args.length < 1) return enviar(`『❗』Use: ${p + command} Marque uma foto!`)
const ftgp = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
const medipp = await tobi.downloadAndSaveMediaMessage(ftgp)
await tobi.updateProfilePicture (from, medipp)
enviar('『❗』foto do grupo alterada')
break

case 'marcar': //Grupo
case 'tagall':
tobi.updatePresence(from, Presence.composing)
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
members_id = []
todos = (args.length > 1) ? body.slice(8).trim(): ''
todos += `Total: ${groupMembers.length} membros\n`
for (let mem of groupMembers) {
todos += `║➸@${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions('╭╾╼◐⚋ ༒ᴍᴇɴᴄɪᴏɴᴀʀ ᴛᴏᴅᴏs ༒⚋◑╾╼╮\n║➸'+todos+'╰╾╼◐⚋ ༒ᴍᴇɴᴄɪᴏɴᴀʀ ᴛᴏᴅᴏs ༒⚋◑╾╼╯', members_id, true)
break

case 'grupo-info': //Grupo
tobi.updatePresence(from, Presence.composing)
if (!isGroup) return enviar(ptbr.group())
ppUrl = await tobi.getProfilePicture(from) // deixe vazio para obter o seu
buffer = await getBuffer(ppUrl)
tobi.sendMessage(from, buffer, image, {quoted: mek, caption: `*NOME* : ${groupName}\n*MEMBRO* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESCRIÇÃO* : ${groupDesc}`})
break

case 'listadmins': //Grupo
case 'listadmin':
case 'adminlist':
case 'lista-adm':
if (!isGroup) return enviar(ptbr.group())
adl = `Lista de administradores do grupo: ${groupMetadata.subject}\nTotal: ${groupAdmins.length}\n\n`
no = 0
for (let admon of groupAdmins) {
no += 1
adl += `[${no.toString()}] @${admon.split('@')[0]}\n`
}
mentions(adl, groupAdmins, true)
break

case 'link-gp': //Grupo
case 'linkgc':
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot
linkgc = await tobi.groupInviteCode(from)
enviar('https://chat.whatsapp.com/'+linkgc)
break

case 'notif': //Grupo
if (!isGroupAdmins) return enviar(ptbr.admin())
tobi.updatePresence(from, Presence.composing)
if (!isGroup) return enviar(ptbr.group())
if (args.length < 1) return enviar(`『❗』Use: ${p + command} Aviso!`)
aviso  = `Aviso de: @${sender.split("@")[0]}\n\nAviso: ${body.slice(7)}`
group = await tobi.groupMetadata(from);
member = group['participants']
jids = [];
member.map(async adm => {
jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
text: aviso,
contextInfo: {
mentionedJid: jids
},
quoted: mek
}
await tobi.sendMessage(from, options, text)
break

case 'supertag': //Grupo
if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, sticker, options)
fs.unlinkSync(file)
} else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, image, options)
fs.unlinkSync(file)
} else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'audio/mp4',
ptt : true,
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, audio, options)
fs.unlinkSync(file)
}  else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
file = await tobi.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
value = args.join(" ")
var group = await tobi.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
mimetype : 'video/mp4',
contextInfo: { mentionedJid: mem },
quoted: mek
}
ini_buffer = fs.readFileSync(file)
tobi.sendMessage(from, ini_buffer, video, options)
fs.unlinkSync(file)
} else{
enviar(`[❗] Responder imagem/adesivo/áudio/vídeo com a legenda ${p + command} para marcar`)
}
break    

case 'delete': //Grupo
case 'del':
case 'apagar':
if (!isGroup)return enviar(ptbr.group())
if (!isGroupAdmins)return enviar(ptbr.admin())
try {
tobi.deleteMessage(from, {
id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true
})
} catch {
enviar('Só é possível deletar mensagens minhas')
}
break

case 'welcome':
if (!isGroup) return enviar(ptbr.group())
if (!isGroupAdmins) return enviar(ptbr.admin())
if (!isBotGroupAdmins) return enviar(ptbr.Badmin()) //_`Pedi adm, para o bot //_`Pedi adm, para o bot
if (args.length < 1) return enviar(`[❗]On/Off, Exemplo ${p + command} On`)
if (args[0] === 'on') {
if (isWelcome) return enviar('*[❗] ja esta ativado amigo...*')
welcome.push(from)
fs.writeFileSync('./base de dados/arquivos/welcome.json', JSON.stringify(welcome))
enviar(mess.only.tobireplay)
} else if (args[0] === 'off') {
let position = welcome.indexOf(welcome.find((x) => x === from))
if (position === -1) return enviar(`${command} não estava ativo antes`)
welcome.splice(position, 1)
fs.writeFileSync('./base de dados/arquivos/welcome.json', JSON.stringify(welcome))
enviar(mess.only.tobireplayoff)
} else {
enviar(`[❗]ativar/desativar, Exemplo ${p + command} On`)
}
break
// FIM DOS COMANDOS EM GRUPO

// COMEÇO DOS COMANDOS DE FIGU
case 'stiker':
case 'sticker':
case 'stickergif':
case 'stikergif':
case 'gif':
case 'f':
case 'figu':
case 'figurinha':
case 'fig':
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
enviar(ptbr.wait())
await ffmpeg(`./${media}`)
.input(media)
.on('start', function (cmd) {
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
enviar(ptbr.stick())
})
.on('end', function () {
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${ran} -o ${ran}`, async (error) => {
if (error) return enviar(ptbr.stick())
tobi.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
fs.unlinkSync(media)	
fs.unlinkSync(ran)	
 })
 })
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`, `scale='min(180,iw)':min'(180,ih)':force_original_aspect_ratio=decrease,fps=20, pad=180:180:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
enviar(ptbr.wait())
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
enviar(`A conversão de ${tipe} para o sticker falhou`)
})
.on('end', function () {
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${ran} -o ${ran}`, async (error) => {
if (error) return enviar(ptbr.stick())
tobi.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`, `scale='min(180,iw)':min'(180,ih)':force_original_aspect_ratio=decrease,fps=20, pad=180:180:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(ran)
} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
ranw = getRandom('.webp')
ranp = getRandom('.png')
enviar(ptbr.waitgif())
keyrmbg = 'sfFSzxRz7y6jYDwfxx47rCgz'
await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
fs.unlinkSync(media)
let buffer = Buffer.from(res.base64img, 'base64')
fs.writeFileSync(ranp, buffer, (err) => {
if (err) return enviar('ocorreu um erro')
})
exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
fs.unlinkSync(ranp)
if (err) return enviar(ptbr.stick())
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${ranw} -o ${ranw}`, async (error) => {
if (error) return enviar(ptbr.stick())
tobi.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
fs.unlinkSync(ranw)
})
})
})
} else {
enviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`)
}
break

case 'st':
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
rano = getRandom('.webp')
enviar(ptbr.wait())
await ffmpeg(`./${media}`)
.input(media)
.on('start', function(cmd) {
})
.on('error', function(err) {
console.log(`Error : ${err}`)
enviar(ptbr.stick())
})
exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
fs.unlinkSync(media)
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${rano} -o ${rano}`, async(error) => {
buffer = fs.readFileSync(rano)
tobi.sendMessage(from, buffer, sticker, {
quoted: mek
})
fs.unlinkSync(rano)
})
})
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
rano = getRandom('.webp')
enviar(ptbr.wait())
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function(cmd) {
})
.on('error', function(err) {
console.log(`Error : ${err}`)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
enviar(`Falha na conversão de ${tipe} para sticker`)
})
exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(media)
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${rano} -o ${rano}`, async(error) => {
buffer = fs.readFileSync(rano)
tobi.sendMessage(from, buffer, sticker, {
quoted: mek
})
fs.unlinkSync(rano)
})
})
} else {
enviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`)
}
break

case 'stk':
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
enviar(ptbr.wait())
await ffmpeg(`./${media}`)
.input(media)
.on('start', function(cmd) {
})
.on('error', function(err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
enviar(ptbr.stick())
})
.on('end', function() {
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${ran} -o ${ran}`, async(error) => {
if (error) return enviar(ptbr.stick())
tobi.sendMessage(from, fs.readFileSync(ran), sticker, {
quoted: mek
})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `crop=w='min(min(iw\,ih)\,650)':h='min(min(iw\,ih)\,650)',scale=320:320,setsar=1,fps=15`, `-loop`, `0`, `-ss`, `00:00:00.0`, `-t`, `00:00:10.0`, `-preset`, `default`, `-an`, `-vsync`, `0`, `-s`, `512:512`])
.toFormat('webp')
.save(ran)
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await tobi.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.webp')
enviar(ptbr.wait())
await ffmpeg(`./${media}`)
.inputFormat(media.split('.')[1])
.on('start', function(cmd) {
})
.on('error', function(err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
enviar(`A conversão de ${tipe} para o sticker falhou`)
})
.on('end', function() {
exec(`webpmux -set exif ${addMetadata(`${SeuNome}`)} ${ran} -o ${ran}`, async(error) => {
if (error) return enviar(ptbr.stick())
tobi.sendMessage(from, fs.readFileSync(ran), sticker, {
quoted: mek
})
fs.unlinkSync(media)
fs.unlinkSync(ran)
})
})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `crop=w='min(min(iw\,ih)\,320)':h='min(min(iw\,ih)\,320)',scale=200:200,setsar=1,fps=15`, `-loop`, `0`, `-ss`, `00:00:00.0`, `-t`, `00:00:10.0`, `-preset`, `default`, `-an`, `-vsync`, `0`, `-s`, `512:512`])
.toFormat('webp')
.save(ran)
} else {
enviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`)
}
break

case 'toimg':
tobi.updatePresence(from, Presence.composing)
if (!isQuotedSticker) return enviar('『❗』Você precisa marcar um sticker não animado para isso')
enviar(ptbr.wait())
tomg = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
medtmg = await tobi.downloadAndSaveMediaMessage(tomg)
ran = getRandom('.png')
exec(`ffmpeg -i ${medtmg} ${ran}`, (err) => {
fs.unlinkSync(medtmg)
if (err) return enviar('『❗』falha ao converter sticker em imagem')
buffer = fs.readFileSync(ran)
tobi.sendMessage(from, buffer, image, {
quoted: mek,
caption: '🐤'
})
fs.unlinkSync(ran)
})
break

case 'togif': 
if (args.length < 1) return enviar(`『❗』Você precisa marcar um sticker animado para isso`)
if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
const encmediaaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
const mediaaa = await tobi.downloadAndSaveMediaMessage(encmediaaa)
enviar(ptbr.wait())
a = await webp2gifFile(mediaaa)
mp4 = await getBuffer(a.result)
tobi.sendMessage(from, mp4, MessageType.video, {mimetype: 'video/gif', filename: `stick.gif`, quoted: mek, caption: '🐤'})
fs.unlinkSync(mediaaa)
}
break

case 'attp': 
if (args.length < 1) return enviar(`Use dessa forma:\nComando: ${p}attp ${SeuNome} gado`)
enviar(ptbr.wait())
attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(body.slice(5))}`)
tobi.sendMessage(from, attp2, sticker, {quoted: mek})
break
// FIM DOS COMANDOS DE FIGURINHAS

// COMEÇO DOS COMANDOS DE MÚSICA
case 'play':
if (args.length < 1) return enviar(`Exemplo : ${p}play Plutão`)	
hay = body.slice(6)
enviar(ptbr.wait())
anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?apikey=S38aL2CO2Ez4wZjJWxD2vaJKKrC&q=${hay}`)
buffer = await getBuffer(anu.result.thumbnail) 
lagu = await getBuffer(anu.result.url_audio)
tobi.sendMessage(from, buffer, image, {quoted: mek, caption:'Calmae oni-chan❤️'})
tobi.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
break

//_EFEITO NIGHTCORE PARA AUDIO         
case 'rapido':  
case 'nightcore':
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito rápido....')
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
bmedia = await tobi.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${bmedia} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(bmedia)
if (err) return enviar('Error!')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break   

//_EFEITO SLOW PARA AUDIO
case 'devagar': 
case 'slow':
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito devagar....')
low = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
slo = await tobi.downloadAndSaveMediaMessage(low)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${slo} -filter:a "atempo=0.9,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(slo)
if (err) return enviar('Error!')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break

//_EFEITO ESQUILO PARA AUDIO
case 'esquilo': 
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito esquilo....')
pai = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
tup = await tobi.downloadAndSaveMediaMessage(pai)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${tup} -filter:a "atempo=0.7,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(tup)
if (err) return enviar('Error!')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break

//_EFDEITO GIGANTE PARA AUDIO	
case 'gemuk': 
case 'gigante':
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito gigante....')
muk = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
gem = await tobi.downloadAndSaveMediaMessage(muk)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(gem)
if (err) return enviar('Error!')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break

//_DEIXA O AUDIO RÁPIDO
case 'fast': 
case 'rapid':
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito rapido 3x....')
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
amedia = await tobi.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${amedia} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(amedia)
if (err) return enviar('Erro')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break

//_AUMENTA O BASS DE UM AUDIO	
case 'baixo': 
case 'bass':
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito baixo 50hz....')
ass = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
bas = await tobi.downloadAndSaveMediaMessage(ass)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${bas} -af equalizer=f=20:width_type=o:width=2:g=15 ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(bas)
if (err) return enviar('Error!')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break

//_DEIXA O AUDIO ESTOURADO		
case 'earrape': 
case 'estourar':       
if (!isQuotedAudio) return enviar('Marque um áudio')
enviar('『❗』Aguarde, Adicionando efeito estorado....')
ass = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
bas = await tobi.downloadAndSaveMediaMessage(ass)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${bas} -af equalizer=f=90:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(bas)
if (err) return enviar('Error!')
hah = fs.readFileSync(ran)
tobi.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break
// FIM DOS COMANDOS DE AUDIOS

// COMEÇO DOS COMANDOS DA NUVEM
case 'liststik':
teks = '*lista de figurinhas:*\n\n'
for (let awokwkwk of setiker) {
teks += `⪧ ${awokwkwk}\n`
}
teks += `\n*Total : ${setiker.length}*\nUse o comando\n*${p}getstik (nome do pacote)*\nPara pegar adesivos`
tobi.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setiker } })
break

case 'getstik':
var itsme = `0@s.whatsapp.net`
var split = `${cr}`
var selepbot = {
contextInfo: {
participant: itsme,
quotedMessage: {
extendedTextMessage: {
text: split,
}
}
}
}
namastc = body.slice(9)
try {
result = fs.readFileSync(`./base de dados/temp/stick/${namastc}.webp`)
tobi.sendMessage(from, result, sticker, selepbot)
} catch {
enviar('Pacote não registrado')
}
break

case 'addstik':
if (!isQuotedSticker) return enviar('Responder o adesivo')
if (!isOwner) return enviar(mess.only.ownerB)
svst = body.slice(9)
if (!svst) return enviar('Qual é o nome do adesivo?')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await tobi.downloadMediaMessage(boij)
setiker.push(`${svst}`)
fs.writeFileSync(`./base de dados/temp/stick/${svst}.webp`, delb)
fs.writeFileSync('./base de dados/temp/stik.json', JSON.stringify(setiker))
tobi.sendMessage(from, `Adicionando adesivo com sucesso\nConferido por ${p}liststik`, MessageType.text, { quoted: mek })
break

case 'listvn':
case 'vnlist':
teks = '*List Vn:*\n\n'
for (let awokwkwk of audionye) {
teks += `- ${awokwkwk}\n`
}
teks += `\n*Total : ${audionye.length}*\nUse comandos\n*${p}getvn (nome do pacote)*\nPara pegar o audio`
tobi.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": audionye } })
break

case 'addvn':
if (!isQuotedAudio) return enviar('Marque um audio!!!')
if (!isOwner) return enviar(mess.only.ownerB)
svst = body.slice(7)
if (!svst) return enviar('Qual é o nome do audio')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await tobi.downloadMediaMessage(boij)
audionye.push(`${svst}`)
fs.writeFileSync(`./base de dados/temp/audio/${svst}.mp3`, delb)
fs.writeFileSync('./base de dados/temp/vn.json', JSON.stringify(audionye))
tobi.sendMessage(from, `Sucesso ao adicionar audio\nConferido por ${p}listvn`, MessageType.text, { quoted: mek })
break

case 'getvn':
namastc = body.slice(7)
try {
buffer = fs.readFileSync(`./base de dados/temp/audio/${namastc}.mp3`)
tobi.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
} catch {
enviar('Pacote não registrado')
}
break

case 'listimg':
teks = '*Lista Imagem :*\n\n'
for (let awokwkwk of imagenye) {
teks += `- ${awokwkwk}\n`
}
teks += `\n*Total : ${imagenye.length}*\nUse o comando\n*${p}getimg (nome do pacote)*\nPara tirar fotos`
tobi.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagenye } })
break

case 'addimg':
if (!isQuotedImage) return enviar('responder imagem ')
if (!isOwner) return enviar(mess.only.ownerB)
svst = body.slice(8)
if (!svst) return enviar('Qual é o nome da imagem ')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await tobi.downloadMediaMessage(boij)
imagenye.push(`${svst}`)
fs.writeFileSync(`./base de dados/temp/foto/${svst}.jpeg`, delb)
fs.writeFileSync('./base de dados/temp/image.json', JSON.stringify(imagenye))
tobi.sendMessage(from, `Adicionando Video com Sucesso\nConferido por ${p}listimage`, MessageType.text, { quoted: mek })
break

case 'getimg':
namastc = body.slice(8)
try {
buffer = fs.readFileSync(`./base de dados/temp/foto/${namastc}.jpeg`)
tobi.sendMessage(from, buffer, image, { quoted: mek, caption: `Resultado do banco de dados : ${namastc}.jpeg` })
} catch {
enviar('Pack tidak terdaftar')
}
break

case 'listvid':
teks = '*Lista de Videos :*\n\n'
for (let awokwkwk of videonye) {
teks += `- ${awokwkwk}\n`
}
teks += `\n*Total : ${videonye.length}*\nUse o comando\n*${p}getvid (nome do pacote)*\nPara pegar um video`
tobi.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": videonye } })
break

case 'addvid':
if (!isOwner) return enviar(mess.only.ownerB)
if (!isQuotedVideo) return enviar('Marque um video')
svst = body.slice(8)
if (!svst) return enviar('O nome do video')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await tobi.downloadMediaMessage(boij)
videonye.push(`${svst}`)
fs.writeFileSync(`./base de dados/temp/vídeo/${svst}.mp4`, delb)
fs.writeFileSync('./base de dados/temp/vid.json', JSON.stringify(videonye))
tobi.sendMessage(from, `Sucesso Adicionais Video\nConferido por ${p}listvid`, MessageType.text, { quoted: mek })
break

case 'getvid':
namastc = body.slice(8)
try {
buffer = fs.readFileSync(`./base de dados/temp/vídeo/${namastc}.mp4`)
tobi.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
} catch {
enviar('Pacote não registrado')
}
break
// FIM DOS COMANDOS DE AUDIOS

// COMEÇO DOS COMANDOS DE JOGOS
case 'dado': //Jogos
const dadus = ["⚀","⚁","⚂","⚃","⚄","⚅"]
dadu = dadus[Math.floor(Math.random() * dadus.length)]
dador = fs.readFileSync('./base de dados/dados/'+dadu+'.webp')
tobi.sendMessage(from, dador, sticker, {quoted: mek})
break

case 'tagme': //Jogos
const tagme = {
text: `@${sender.split("@")[0]} 🧙‍♂️`,
contextInfo: {mentionedJid: [sender]
}
}
tobi.sendMessage(from, tagme, text)
break

case "ppt": //Jogos
if (args.length < 1) return enviar(ptbr.tterro())
ppt = ["pedra","papel","tesoura"]
ppy = ppt[Math.floor(Math.random() * ppt.length)]
ppg = Math.floor(Math.random() * 13) + 349
pptb = ppy
pph = `Você ganhou ${ppg} em xp`
if ((pptb == "pedra" && args == "papel") || 
(pptb == "papel" && args == "tesoura") || 
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if ((pptb == "pedra" && args == "tesoura") || 
(pptb == "papel" && args == "pedra") || 
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if ((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if (vit = "undefined") {
return enviar(ptbr.tterro())
}
if (vit == "vitoria") {
var tes = "Vitória do jogador"
}
if (vit == "derrota" ) {
var tes = "A vitória é do bot"
}
if (vit == "empate" ) {
var tes = "O jogo terminou em empate"
}
enviar(`Bot jogou: ${pptb}\nO jogador jogou: ${args}\n\n${tes}`)
if (tes == "Vitória do jogador") {
enviar(pph)
}
break

case 'gado': //Jogos
var chifre = ["ultra extreme gado", "Gado-Master", "Gado-Rei", "Gado", "Escravo-ceta", "Escravo-ceta Maximo", "Gacorno?", "Jogador De Forno Livre<3", "Mestre Do Frifai<3<3", "Gado-Manso", "Gado-Conformado", "Gado-Incubado", "Gado Deus", "Mestre dos Gados", "Topa tudo por buceta", "Gado Comum", "Mini Gadinho", "Gado Iniciante", "Gado Basico", "Gado Intermediario", "Gado Avançado", "Gado Profisional", "Gado Mestre", "Gado Chifrudo", "Corno Conformado", "Corno HiperChifrudo", "Chifrudo Deus", "Mestre dos Chifrudos"]
var gado = chifre[Math.floor(Math.random() * chifre.length)]
gadop = `${Math.floor(Math.random() * 100)}`
hisil = `Você é:\n\n${gado}`
enviar(hisil)
break

case 'sn': //jogos
const sn = ['sim', 'não']
gosto = body.slice(3)
if (args.length < 1) return tobi.sendMessage(from, `Você deve fazer uma pergunta...\nExemplo: ${p}sn O ${SeuNome} é um baiano preguiçoso?`, text, {quoted: mek})
const jawab = sn[Math.floor(Math.random() * (sn.length))]
hasil = `${gosto}\n\nSegundo meus cálculos, eu acredito que... ${jawab}`
enviar(hasil)
break

case 'chance': //Jogos
tobi.updatePresence(from, Presence.composing) 
var avb = body.slice(7)
if (args.length < 1) return tobi.sendMessage(from, `Você precisa digitar da forma correta\nExemplo: ${p}chance do ${SeuNome} ser um trouxa`, text, {quoted: mek})
random = `${Math.floor(Math.random() * 100)}`
hasil = `A chance ${body.slice(7)}\n\né de... ${random}%`
tobi.sendMessage(from, hasil, text, {quoted: mek, contextInfo: {mentionedJid: [sender]}})
break

case 'pau'://Jogos
random = `${Math.floor(Math.random() * 35)}`
const tamanho = random
if (tamanho < 13 ) {pp = 'só a fimose'} else if (tamanho == 13 ) {pp = 'passou da média😳'} else if (tamanho == 14 ) {pp = 'passou da média😳'} else if (tamanho == 15 ) {pp = 'eita, vai pegar manga?'} else if (tamanho == 16 ) {pp = 'eita, vai pegar manga?'} else if (tamanho == 17 ) {pp = 'calma man, a mina não é um poço😳'} else if (tamanho == 18 ) {pp = 'calma man, a mina não é um poço😳'} else if (tamanho == 19 ) {pp = 'calma man, a mina não é um poço😳'} else if (tamanho == 20 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 21 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 22 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 23 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 24 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho > 25 ) {pp = 'vai procurar petróleo com isso?'
}
hasil = `Seu pau tem ${random}cm\n\n${pp}`
enviar(hasil)
break

case 'slot': //Jogos
const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]	
ppg = Math.floor(Math.random() * 13) + 349
if ((somtoy == '🥑 : 🥑 : 🥑') ||(somtoy == '🍉 : 🍉 : 🍉') ||(somtoy == '🍓 : 🍓 : 🍓') ||(somtoy == '🍎 : 🍎 : 🍎') ||(somtoy == '🍍 : 🍍 : 🍍') ||(somtoy == '🥝 : 🥝 : 🥝') ||(somtoy == '🍑 : 🍑 : 🍑') ||(somtoy == '🥥 : 🥥 : 🥥') ||(somtoy == '🍋 : 🍋 : 🍋') ||(somtoy == '🍐 : 🍐 : 🍐') ||(somtoy == '🍌 : 🍌 : 🍌') ||(somtoy == '🍒 : 🍒 : 🍒') ||(somtoy == '🔔 : 🔔 : 🔔') ||(somtoy == '🍊 : 🍊 : 🍊') ||(somtoy == '🍇 : 🍇 : 🍇')) {
var vitr = "Você ganhou!!!"
} else {
var vitr = "Você perdeu..."
}
const slott = 
`Consiga 3 iguais para ganhar
╭╾╾╾╾ ≪ •❈• ≫ ╾╾╾╾╗
║         [💰SLOT💰 | 777 ]        
║                                             
║                                             
║           ${somtoy}  ◄━━┛
║            
║                                           
║          [💰SLOT💰 | 777 ]        
╚╾╾╾╾ ≪ •❈• ≫ ╾╾╾╾╝

${vitr}`
if (vitr == "Você ganhou!!!") {
setTimeout( () => {
enviar(`Você ganhou ${ppg} em xp!!!`)
}, 1100)
}
tobi.sendMessage(from, slott, text, {quoted: mek})
break
   
case 'gay': //Jogos
tobi.updatePresence(from, Presence.composing) 
random = `${Math.floor(Math.random() * 100)}`
boiola = random
if (boiola < 20 ) {bo = 'hmm... você é hetero😔'} else if (boiola == 21 ) {bo = '+/- boiola'} else if (boiola == 23 ) {bo = '+/- boiola'} else if (boiola == 24 ) {bo = '+/- boiola'} else if (boiola == 25 ) {bo = '+/- boiola'} else if (boiola == 26 ) {bo = '+/- boiola'} else if (boiola == 27 ) {bo = '+/- boiola'} else if (boiola == 28 ) {bo = '+/- boiola'} else if (boiola == 29 ) {bo = '+/- boiola'} else if (boiola == 30 ) {bo = '+/- boiola'} else if (boiola == 31 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 32 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 33 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 34 ) {bo = 'tenho minha desconfiança...??'} else if (boiola == 35 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 36 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 37 ) {bo = 'tenho minha desconfiança...??'} else if (boiola == 38 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 39 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 40 ) {bo = 'tenho minha desconfiança...😑'} else if (boiola == 41 ) {bo = 'você é né?😏'} else if (boiola == 42 ) {bo = 'você é né?😏'} else if (boiola == 43 ) {bo = 'você é né?😏'} else if (boiola == 44 ) {bo = 'você é né?😏'} else if (boiola == 45 ) {bo = 'você é né?😏'} else if (boiola == 46 ) {bo = 'você é né?😏'} else if (boiola == 47 ) {bo = 'você é né?😏'} else if (boiola == 48 ) {bo = 'você é né?😏'} else if (boiola == 49 ) {bo = 'você é né?😏'} else if (boiola == 50 ) {bo = 'você é ou não???'} else if (boiola > 51) {bo = 'você é gay??'
}
hasil = `Você é ${random}% gay\n\n${bo}`
enviar(hasil)
break

case 'roleta': //Jogos
const tiro = ["vazio","vazio","vazio","vazio","vazio","vazio","vazio","vazio","pow","pow"]
const figr = ["pattta1","pattta2","pattta3"]
tpa = tiro[Math.floor(Math.random() * (tiro.length))]	
tpb = figr[Math.floor(Math.random() * (figr.length))]
figb = fs.readFileSync('./src/'+tpb+'.webp')
if (tpa == "vazio") {
var morte = "Você teve sorte dessa vez, o tambor estava vazio."
} else if (tpa == "pow") {
var morte = "Tinha uma bala no tambor, POW!"
}
if (morte == "Tinha uma bala no tambor, POW!") {
setTimeout( () => {
tobi.sendMessage(from, figb, sticker, {quoted: mek})
}, 2100)
}
setTimeout( () => {
tobi.sendMessage(from, morte, text, {quoted: mek})
}, 2300)
break

case 'caracoroa': //Jogos
const cara = fs.readFileSync('./base de dados/cara/cara.webp');
const coroa = fs.readFileSync('./base de dados/cara/coroa.webp');
cararo = ["cara", "coroa"]
fej = cararo[Math.floor(Math.random() * cararo.length)]
gg = fej
enviar(`você conseguiu: ${fej}`)
cararoa = fs.readFileSync('./base de dados/cara/'+fej+'.webp')
tobi.sendMessage(from, cararoa, sticker, {quoted: mek})
break
// FIM DOS COMANDOS DE JOGOS

// COMEÇO DOS COMANDOS DE FOTOS
case  'hentai': 
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
anu = await fetchJson(`https://waifu.pics/api/nsfw/neko`)
buffer = await getBuffer(anu.url)
tobi.sendMessage(sender, buffer, image, {caption: 'Baum né?', quoted: mek, thumbnail:null})
break

case  'neko':
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
anu = await fetchJson(`https://waifu.pics/api/nsfw/neko`)
buffer = await getBuffer(anu.url)
tobi.sendMessage(sender, buffer, image, {caption: `${command}, certo?`, quoted: mek, thumbnail:null})
break

case 'eroneko':
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?nsfw=eroNeko&apikey=hardianto`)
kon = await getBuffer(hai)
tobi.sendMessage(sender, kon, image, {caption: `Hehehehe`, quoted: mek, thumbnail:null})
break

case 'kitsune':
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?nsfw=kitsune&apikey=hardianto`)
kon = await getBuffer(hai)
tobi.sendMessage(sender, kon, image, {caption: `Linda dms!`, quoted: mek, thumbnail:null})
break

case 'pussy':
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
hai = await getBuffer(`https://hardianto-chan.herokuapp.com/api/anime/random?nsfw=pussy&apikey=hardianto`)
tobi.sendMessage(sender, hai, image, {caption: `Op!!🤯`, quoted: mek, thumbnail:null})
break

case 'trapnime':
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
anu = await fetchJson(`https://waifu.pics/api/nsfw/trap`)
buffer = await getBuffer(anu.url)
tobi.sendMessage(sender, buffer, image, { quoted: mek, thumbnail:null})
break

case 'bj':
if (!isGroup) enviar(ptbr.wait())
if (isGroup) enviar(`『❗』${command} enviado no seu pv`)
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?nsfw=bJ&apikey=hardianto`)
kon = await getBuffer(hai)
tobi.sendMessage(sender, kon, image, {caption: `${command}, certo?`, quoted: mek, thumbnail:null})
break

// FIM DOS COMANDOS DE HENTAIS

// COMEÇO DOS COMANDOS DE FOTOS
case 'wallpaper':
enviar(ptbr.wait())
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=wallpaper&apikey=hardianto`)
kon = await getBuffer(hai)
tobi.sendMessage(from, kon, image, {caption: 'Gostou?', quoted: mek, thumbnail:null})
break

case  'megumin':
enviar(ptbr.wait())
anu = await fetchJson(`https://waifu.pics/api/sfw/megumin`)
buffer = await getBuffer(anu.url)
tobi.sendMessage(from, buffer, image, {caption: `${command}, certo?`, quoted: mek, thumbnail:null})
break

case 'neko2':
enviar(ptbr.wait())
hai = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=neko&apikey=hardianto`)
kon = await getBuffer(hai)
tobi.sendMessage(from, kon, image, { quoted: mek, thumbnail:null})
break

case 'beijo':
enviar(ptbr.wait())
kau = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=kiss&apikey=hardianto`)
kon = await getBuffer(kau)
tobi.sendMessage(from, kon, image, { quoted: mek, thumbnail:null})
break

case 'kemonomimi':
enviar(ptbr.wait())
kau = (`https://hardianto-chan.herokuapp.com/api/anime/random?sfw=kemonomimi&apikey=hardianto`)
kon = await getBuffer(kau)
tobi.sendMessage(from, kon, image, { quoted: mek, thumbnail:null})
break
// FIM DOS COMANDOS DE FOTOS

case 'amongus':  //fuciona
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return enviar('Você precisa mencionar alguém')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pro = '.\n'
for (let _ of mentioned) {
pro += `@${_.split('@')[0]}\n`
}
sus = 
`.      　。　　　　•　    　ﾟ　　。
　　.　　　.　　　  　　.　　　　　。　　   。　.
　.　　      。　        ඞ   。　    .    •
•            @${mentioned[0].split('@')[0]} was E j e c t e d
                  1 impostor remain   。　.
　 　　。　　 　　　　ﾟ　　　.　      　　　.
,　　　　.                  .`
//tobi.groupRemove(from, mentioned)
mentions(`${sus}`, mentioned, true)
break
// FIM DOS COMANDOS DE JOGOS

// COMEÇO DOS COMANDOS DO DONO
case 'bc':
if (!isOwner) return enviar('Quem é Você, Você não é meu dono ???')
if (args.length < 1) return enviar('.......')
anu = await tobi.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await tobi.downloadMediaMessage(encmedia)
for (let _ of anu) {
tobi.sendMessage(_.jid, buff, image, {caption: `[ TRANSMI??O DE AVISO ]\n\n${body.slice(4)}`})
}
enviar('Transmissão enviada com sucesso')
} else {
for (let _ of anu) {
sendMess(_.jid, `[ TRANSMISSÃO O DE AVISO ]\n\n${body.slice(4)}`)
}
enviar('Transmissão enviada com sucesso')
}
break

case 'clone': //Dono
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return  enviar(ptbr.ownerB())
if (args.length < 1) return enviar('Mencione quem devo roubar a foto de perfil')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return enviar('Tag cvk')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
try {
pp = await tobi.getProfilePicture(id)
buffer = await getBuffer(pp)
tobi.updateProfilePicture(botNumber, buffer)
mentions(`Roubei a foto de perfil de: @${id.split('@')[0]}`, [jid], true)
} catch (e) {
enviar('ocorreu um erro')
}
break

case 'block': //Dono
case 'bloquear':
tobi.updatePresence(from, Presence.composing)
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return enviar(ptbr.ownerB())
tobi.blockUser (`${body.slice(8)}@c.us`, "add")
tobi.sendMessage(from, `Número de bloqueio, pedido recebido`, text, {
quoted: mek
})
break

case 'unblock': //Dono
case 'desbloquear':
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return enviar(ptbr.ownerB())
tobi.blockUser (`${body.slice(9)}@c.us`, "remove")
enviar(from, `Desbloquear, comando aceito`, text)
break

case 'ban': //Dono
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return  enviar(ptbr.ownerB())
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.push(`${mentioned}`)
fs.writeFileSync('./base de dados/datauser/banned.json', JSON.stringify(ban))
susp = `🚫@${mentioned[0].split('@')[0]} foi banido e não poderá mais usar os comandos do bot🚫`
mentions(`${susp}`, mentioned, true)   
break

case 'unban': //Dono
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return  enviar(ptbr.ownerB())
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
ban.splice(`${mentioned}`)
fs.writeFileSync('./base de dados/datauser/banned.json', JSON.stringify(ban))
susp = `❎@${mentioned[0].split('@')[0]} foi desbanido e poderá novamente usar os comandos do bot❎`
mentions(`${susp}`, mentioned, true)   
break

case 'addprem': //Dono
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return  enviar(ptbr.ownerB())
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
prem.push(`${mentioned}`)
fs.writeFileSync('./base de dados/datauser/premium.json', JSON.stringify(prem))
susp = `👑@${mentioned[0].split('@')[0]} foi adicionado à lista de usuários premium com sucesso👑`
mentions(`${susp}`, mentioned, true)   
break

case 'dellprem': //Dono
if (!isGroup) return enviar(ptbr.group())
if (!isOwner) return  enviar(ptbr.ownerB())
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
delp = prem.indexOf(oh)
prem.splice(`${mentioned}`)
fs.writeFileSync('./base de dados/datauser/premium.json', JSON.stringify(prem))
susp = `✖@${mentioned[0].split('@')[0]} foi removido da lista de usuários premium✖`
mentions(`${susp}`, mentioned, true)   
break

case 'ping':
case 'speed':
const timestamp = speed();
const latensi = speed() - timestamp
tobi.updatePresence(from, Presence.composing)
uptime = process.uptime()
tobi.sendMessage(from, `
*Velocidade de resposta do bot*
*Velocidade* : ${latensi.toFixed(4)} _Segundo_

*Info do bot*
*Total chat* : ${totalchat.length}
*Block* : ${blocked.length}
*Online* : ${kyun(uptime)}`,
text, {
quoted: mek
})
break

case 'visuchat':
const readallid = await tobi.chats.all()
tobi.setMaxListeners(25)
for (let xyz of readallid) {
await tobi.chatRead(xyz.jid)
}
tobi.sendMessage(from, `Pronto`, text, {
quoted: {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
remoteJid: "status@broadcast"
} : {})
},
message: {
"imageMessage": {
"mimetype": "image/jpeg",
"caption": "Todos os chats foram vistos",
'jpegThumbnail': fs.readFileSync('./src/bot.jpg')
}
}
}
})
break

case 'blocklist':
teks = 'Esta é uma lista de numeros bloqueados :\n'
for (let block of blocked) {
teks += `~> @${block.split('@')[0]}\n`
}
teks += `Total : ${blocked.length}`
tobi.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
break

case 'restart':
if (!isOwner) return enviar(ptbr.ownerB)
enviar('Bot desligado')
setTimeout(() => {
tobi.close()
}, 3000)
break

case 'clearchat':
case 'clearall':
if (!isOwner) return  enviar(ptbr.ownerB())
anu = await tobi.chats.all()
list_chat = await tobi.chats.all()
for (let chat of list_chat) {
tobi.modifyChat(chat.jid, "delete", {includeStarred: false})
}
enviar("Chat limpo")
break

default:
if (body == `${p + command}`) {
hsl = `『❗』Comando ${p + command} não existe`
tobi.sendMessage(from, hsl, text, {quoted: mek, contextInfo: {mentionedJid: [sender]}})
console.log('\x1b[1;31m~\x1b[1;37m>', color('[ ERROR ]', "red"), color('Comando', "yellow"), color(`${p}${command}`, "yellow"), color('n?o registrado', "yellow"), color('de', "yellow"), color(pushname, "yellow"))
}
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
enviar('erro')
}
})
}
starts()
//FINAL? PRÓXIMA ATUALIZAÇÃO MAIS COMANDOS, @Lolizita-bot v1