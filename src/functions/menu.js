const colors = require("colors");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

/**
 * 
 * @param {Array} array
 * @return
 */

const create_mh = (
    array
) => {

    if (!array) throw new Error(`[ERROR] The options were not provided! Make sure you provide all the options!`.red.bold);
    if (array.length < 0) throw new Error(`[ERROR] The array has to have atleast one thing to select!`.red.bold);
    let select_menu;

    let id = `help-menus`;
    
    let menus = [];

    const emo = {
        config: "",
        developper: "",
        message: "",
        moderation: "",
        premium: "",
        rules: "",
        system: "",
        utilities: "",
    }

    array.forEach(cca => {
        let name = cca;
        let sName = `${name.toUpperCase()}`;
        let tNmae = name.toLowerCase();
        let fName = name.toUpperCase();

        return menus.push({
            label: sName,
            description: `${tName} slashcommands!`,
            value: fName
        })
    });

    let chicken = new MessageSelectMenu()
        .setCustomId(id)
        .setPlaceholder(`Choose the command category`)
        .addOptions(menus)

    select_menu = new MessageActionRow()
        .addComponents(
            chicken
        );

    return {
        smenu: [select_menu],
        sid: id
    }
}

module.exports = create_mh;