const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) {
            return
        }
        
        if (message.content === "test2" && message.author.id === "998246368512585800") {
            const Weirwood = await message.guild.emojis.cache.find(emoji => emoji.name === 'Weirwood');
            const maester = await message.guild.emojis.cache.find(emoji => emoji.name === 'maester')
            const guild = await message.guild

            const allroleIds = ["288382741450588160", "716773257683927101", "288382736480337920", "438818482692423683", "455248257161887754"]

            let allmemberRoles =[]

            for (let i = 0; i < allroleIds.length; i ++) {
                const roleId = allroleIds[i]
                const role = guild.roles.cache.get(roleId)

                allmemberRoles[i] = role.members.map(m => m.toString())

                if (allmemberRoles[i].length < 2) {
                    allmemberRoles[i] = role.members.map(m => m.toString())
                } else {
                    allmemberRoles[i] = role.members
                    .filter(m => !m.roles.cache.has("288382741450588160") && !m.roles.cache.has("716773257683927101"))
                    .map(m => m.toString())
                }   
            }

            const morerolesButton = new ButtonBuilder()
            .setCustomId('morerolesButton')
            .setLabel("Role Guide")
            .setStyle("Primary")

            const row3 = new ActionRowBuilder()
            .addComponents(morerolesButton)
            message.channel.send({ content: `${maester} <@&288382741450588160> **(President)**\n${allmemberRoles[0]}\n\n${maester} <@&716773257683927101> **(VP)**\n${allmemberRoles[1]}\n\n${maester} <@&288382736480337920> **(Officer)**\n${allmemberRoles[2].join(' ')}\n\n${maester} <@&438818482692423683> **(Enforcer)**\n${allmemberRoles[3].join(' ')}\n\n${maester} <@&455248257161887754> **(Captain)**\n${allmemberRoles[4].join(' ')}\n\n For more info on roles, Click the **Role Guide** button below`, components: [row3]})
            
        

            
        }

        if (message.content === "test" && message.author.id === "998246368512585800") {
            const maester = await message.guild.emojis.cache.find(emoji => emoji.name === 'maester')
            message.channel.send(`${maester} <@&288382741450588160> **(President)**\n<@263370989906165771>\n\n${maester} <@&716773257683927101> **(VP)**\n<@155015894324477952>\n\n${maester} <@&288382736480337920> **(Officer)**\n<@209712946534809600>, <@248467181963051009>, <@142731840510361600>, <@261620906986700801>, <@427282451291701249>, <@160228491206459393>, <@322125001308241920>, <@200690670506082304>\n\n${maester} <@&438818482692423683> **(Enforcer)**\n<@172522468764811274>, <@324630269393108994>, <@254131637648883712>, <@246658601794404352>, <@198104477998383104>, <@201351535614099456>, <@708450015458230352>, <@488720556158484492>, <@199934359808114688>, <@112010273518342144>\n\n${maester} <@&455248257161887754> **(Captain)**\n<@153052293627904000>, <@257597156481957888>, <@279681055764774913>, <@297445641876013056>, <@186104843478368256>, <@125844744399093761>, <@402191805862379525>, <@573760981625208863>, <@307117396563329024>, <@265559356441886720>, <@264783209198387202>, <@299305860763484172>, <@904239802549927987>`)
        }

        /*if (message.content === "message" && message.author.id === "998246368512585800") {
            const Weirwood = await message.guild.emojis.cache.find(emoji => emoji.name === 'Weirwood');
            const maester = await message.guild.emojis.cache.find(emoji => emoji.name === 'maester')

            message.channel.send("https://cdn.discordapp.com/attachments/756494646678519878/758105625594036295/image0_1.png")
            message.channel.send("https://cdn.discordapp.com/attachments/756494646678519878/758105660788703293/welcome_1.png")
            message.channel.send(`${Weirwood} THE  NORTH is a community for good-natured Trovians who enjoy playing the game. We strive to maintain a friendly, peaceful, and fun environment within our club. Our biggest goal is to make Trove a better place through promoting fair play and ethical practices.\n\n${Weirwood} You are welcome to stay in and engage with the Discord even if you are not in the club.\n\n${Weirwood} Please keep in mind that English is the standard language for this club. Keep other languages to a minimum, especially when asked to do so.\n\n${Weirwood} Members inactive for over 14 days will be removed from the club for space. Don't worry as this holds nothing against you. If you need to take an extended break from Trove and have a clear plan to return you can always inform us and we will take that into account. If we urgently need space, we may kick for as low as 10 days of inactivity. If you are kicked for inactivity and would like to come back, let <@&623160704492634112> know and we'll gladly re-invite you!\n\n${Weirwood} We appreciate any and all donations for THE  NORTH. For more information on how to support our club, please see <#531013604904796160>.\n\n${Weirwood} You can use this link to invite your friends to this server: https://discord.gg/MrTn5eT`)
            message.channel.send("https://cdn.discordapp.com/attachments/756494646678519878/758106001068261487/club_applications.png")


            const embed = new EmbedBuilder()
            .setTitle("Club Application Guide")
            .setDescription("Follow these steps to successfully apply to be a member of The North")
            .setThumbnail("https://cdn.discordapp.com/icons/288378882418016256/a_4ea65f4ffe0c1f0901d00de60f117abc.webp?size=96")
            .setFields(
                {
                    name: "Step 1️⃣",
                    value: "Navigate to the **📋 Apply** button below and click on it\n",
                },
                {
                    name: "Step 2️⃣",
                    value: "A Form will pop up and you must fill in the answers to the best of your abilities\n",
                },
                {
                    name: "Step 3️⃣",
                    value: "Under the Image URL for proof question, in order to get the URL, send your screenshot to <#313319114783326210> , then right click on the image and select Copy Link, then paste the link into the Image URL question of the form\n"
                },
                {
                    name: "Step 4️⃣",
                    value: "Once all questions are answered, click submit and thats it your application is completed!\n"
                },
                {
                    name: "Step 5️⃣",
                    value: "Be patient and wait for your application to be approved by staff\n"
                },
                {
                    name: "Step 6️⃣",
                    value: "Once once you have been approved, under your application in <#575228603583692814>, you will see an **Request** button, when you are online and ready to be invited to the club, click the **Request** button to inform staff members to invite you to the club"
                },
                {
                    name: "Step 7️⃣",
                    value: "Lastly, wishing you all the best and hope you are successful in your application!\n"
                },
                {
                    name: "------------",
                    value: " "
                },
                {
                    name: "For Rejected Applicants",
                    value: "Do note that if you have been rejected, the reason will be stated in a DM sent to you" 
                }
            )

            const applyclubButton = new ButtonBuilder()
            .setCustomId("applyclubButton")
            .setLabel("📋 Apply")
            .setStyle("Primary")

            const row = new ActionRowBuilder()
            .addComponents(applyclubButton)

            message.channel.send(`${Weirwood} The requirement to join THE  NORTH is **250+ Total Mastery Rank.**\n\n${Weirwood} To join the club, follow the step-by-step-guide below`)
            message.channel.send(`__**Screenshot Example:**__`)
            message.channel.send(`https://cdn.discordapp.com/attachments/756494646678519878/758106197013430343/Fortis_Total_Mastery_Card.JPG`)
            message.channel.send({ embeds: [embed], components: [row]})

            message.channel.send("https://cdn.discordapp.com/attachments/1068054006276030464/1094693374172336339/Rules_1.png")

            const teaButton = new ButtonBuilder()
            .setCustomId("teaButton")
            .setLabel("TEA")
            .setStyle("Primary")

            const row2 = new ActionRowBuilder()
            .addComponents(teaButton)
            message.channel.send({ content: `${maester} These rules apply to both this Discord server and the club itself.\n\n> **Rule 1️⃣: Respect**\nBe respectful and keep drama out of club chat. No genuine racism or sexism. Do not post pornographic links. Apply common sense. Privately message an enforcer or officer if you need to report a member.\n\n> **Rule 2️⃣ : No Begging**\n Do not beg for free items or spam in chat.\n\n> **Rule 3️⃣ : No Vandalizing/Griefing**\nDo not vandalize anyone's structures in the club world.\n\n> **Rule 4️⃣ : No Lying**\nDo not attempt to lie for unearned benefits. Examples of this would be faking a clubit screenshot or faking a higher speed coeff than you have.\n\n> **Rule 5️⃣ : No Undermining Staff Members**\nDo not undermine staff. We communicate. Don't try to ask different staff for the same thing thinking you'll get a different answer. If you feel the need to report a club staff member, privately message <@263370989906165771>.\n\n> **Rule 6️⃣ : No Random invites**\nSpeaks for itself, its annoying...\n\n> **Rule 7️⃣ : No Spreading of Exploits**\nDo not use THE  NORTH's club chat or Discord to spread exploits or make trades against the ToS.\nTerms of service & such can be found here: https://www.trionworlds.com/en/legal/terms-of-use/\n\n> **Rule 8️⃣ : No Abuse of any kind**\nAbuse of others or Trove as a whole will not be tolerated as per Trove Ethics Alliance regulations: No scamming and no use of cheating programs.\nFind out more about Trove Ethics Alliance (TEA), click the **TEA** Button below`, components: [row2]})
            message.channel.send("https://cdn.discordapp.com/attachments/756494646678519878/758106468485824522/TN_-_Staff_Roster_1.png")

            const morerolesButton = new ButtonBuilder()
            .setCustomId('morerolesButton')
            .setLabel("Role Guide")
            .setStyle("Primary")

            const row3 = new ActionRowBuilder()
            .addComponents(morerolesButton)

            message.channel.send({ content: `${maester} <@&288382741450588160> **(President)**\n<@263370989906165771>\n\n${maester} <@&716773257683927101> **(VP)**\n<@155015894324477952>\n\n${maester} <@&288382736480337920> **(Officer)**\n<@209712946534809600>, <@248467181963051009>, <@142731840510361600>, <@261620906986700801>, <@427282451291701249>, <@160228491206459393>, <@322125001308241920>, <@200690670506082304>\n\n${maester} <@&438818482692423683> **(Enforcer)**\n<@172522468764811274>, <@324630269393108994>, <@254131637648883712>, <@246658601794404352>, <@198104477998383104>, <@201351535614099456>, <@708450015458230352>, <@488720556158484492>, <@199934359808114688>, <@112010273518342144>\n\n${maester} <@&455248257161887754> **(Captain)**\n<@153052293627904000>, <@257597156481957888>, <@279681055764774913>, <@297445641876013056>, <@186104843478368256>, <@125844744399093761>, <@402191805862379525>, <@573760981625208863>, <@307117396563329024>, <@265559356441886720>, <@264783209198387202>, <@299305860763484172>, <@904239802549927987>\n\n For more info on roles, Click the **Role Guide** button below`, components: [row3]})
        }

        if (message.content === "nosleep" && message.author.id === "998246368512585800") {

            const embed = new EmbedBuilder()
            .setTitle("Club Application Guide")
            .setDescription("Follow these steps to apply to be a member of The North")
            .setThumbnail("https://cdn.discordapp.com/icons/288378882418016256/a_4ea65f4ffe0c1f0901d00de60f117abc.webp?size=96")
            .setFields(
                {
                    name: "Step 1️⃣",
                    value: "Navigate to the **📋 Apply** button below and click on it\n",
                },
                {
                    name: "Step 2️⃣",
                    value: "A form will pop up and you must fill in the answers to the best of your abilities\n",
                },
                {
                    name: "Step 3️⃣",
                    value: "Once all questions are answered, click submit and thats it your application is completed!\n"
                },
                {
                    name: "Step 4️⃣",
                    value: "Be patient and wait for your application to be approved by staff\n"
                },
                {
                    name: "Step 5️⃣",
                    value: "Once once you have been approved, a set of instructions will be sent to you in a DM on how to proceed"
                },
                {
                    name: "Step 6️⃣",
                    value: "Make sure your DMs are open to people in the same server to receive updates about your application!\n"
                },
                {
                    name: "--------------------------",
                    value: " "
                },
                {
                    name: "How to get image URL",
                    value: 'In order to get an image URL for your mastery proof, send a screenshot to i.e. <#313319114783326210> , right-click the image, select "Copy Link" and then paste the URL into the form. '
                }
            )

            const applyclubButton = new ButtonBuilder()
            .setCustomId("applyclubButton")
            .setLabel("📋 Apply")
            .setStyle("Primary")

            const row = new ActionRowBuilder()
            .addComponents(applyclubButton)

            message.channel.send({ embeds : [embed], components: [row] })
        }

        if (message.content === "specialedit" && message.author.id === "998246368512585800") {

            const discordChannel = await message.client.channels.cache.get("1094639960742707321")
            const editMessage = await discordChannel.messages.fetch("1094703940345540639")

            const embed = new EmbedBuilder()
            .setTitle("Club Application Guide")
            .setDescription("Follow these steps to apply to be a member of The North")
            .setThumbnail("https://cdn.discordapp.com/icons/288378882418016256/a_4ea65f4ffe0c1f0901d00de60f117abc.webp?size=96")
            .setFields(
                {
                    name: "Step 1️⃣",
                    value: "Navigate to the **📋 Apply** button below and click on it\n",
                },
                {
                    name: "Step 2️⃣",
                    value: "A form will pop up and you must fill in the answers to the best of your abilities\n",
                },
                {
                    name: "Step 3️⃣",
                    value: "Once all questions are answered, click submit and thats it your application is completed!\n"
                },
                {
                    name: "Step 4️⃣",
                    value: "Be patient and wait for your application to be approved by staff\n"
                },
                {
                    name: "Step 5️⃣",
                    value: "Once once you have been approved, a set of instructions will be sent to you in a DM on how to proceed"
                },
                {
                    name: "Step 6️⃣",
                    value: "Make sure your DMs are open to people in the same server to receive updates about your application!\n"
                },
                {
                    name: "--------------------------",
                    value: " "
                },
                {
                    name: "How to get image URL",
                    value: 'In order to get an image URL for your mastery proof, send a screenshot to i.e. <#313319114783326210> , right-click the image, select "Copy Link" and then paste the URL into the form. '
                }
            )

            const applyclubButton = new ButtonBuilder()
            .setCustomId("applyclubButton")
            .setLabel("📋 Apply")
            .setStyle("Primary")

            const row = new ActionRowBuilder()
            .addComponents(applyclubButton)

            editMessage.edit({ embeds : [embed], components: [row] })
        }*/
    }
}