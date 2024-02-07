const { Cluster } = require("puppeteer-cluster");
const cheerio = require("cheerio");

const temp = [
  "finbourne.com",
  "fitforme.de",
  "fitforme.fr",
  "dnagrowth.com",
  "dnsfilter.pl",
  "aerodyne.group",
  "airmeet.co",
  "intellihr.com",
  "intribe.co",
  "iwired.com",
  "bookingjini.com",
  "sastrify.com",
  "seidormexico.com",
  "leon-media.at",
  "papill.io",
  "peats.de",
  "elevate.ac",
  "smartlink.one",
  "soundit.co",
  "spincotech.co.nz",
  "progression.co",
  "mend.com",
  "retail.me",
  "codes2.trade",
  "compleet.com",
  "quincus.com",
  "thewhitelabelagency.com",
  "choosemuse.com",
  "connexin.co.uk",
  "hurrecane.bike",
  "salesboomerang.com",
  "keynest.com",
  "intecbusiness.co.uk",
  "tgoa.com",
  "acceleratedx.com",
  "armadillosec.co.uk",
  "skin-match.com",
  "somos.me",
  "cmc.abudhabi",
  "thetaxi.academy",
  "ting.academy",
  "sse.academy",
  "7knot7.com",
  "82e.com",
  "a2zburgers.com",
  "achalascrochet.com",
  "acs-health.com",
  "acuacs.com",
  "acuindia.in",
  "acupressureacs.com",
  "acupressureguru.com",
  "acupressureindia.co",
  "acupressureindia.net",
  "acupressuremart.com",
  "acupressuresujok.com",
  "acupunctureindia.in",
  "acupunctures.in",
  "adanione.com",
  "adrijaskitchen.in",
  "affinito.in",
  "agrigro.in",
  "ajudhiaindia.in",
  "anchol.in",
  "anjilsfood.com",
  "ankitasharma.net",
  "ankitasharma.org",
  "annapurnakitchenandrefrigeration.com",
  "apnapad.com",
  "arcstationerygurgaon.com",
  "artemispetstore.in",
  "ashoknutririch.com",
  "asimhairandmakeup.com",
  "attperf.com",
  "atulyafresh.com",
  "avocadodarjeeling.com",
  "babyfirstfurniture.com",
  "baeroastedcoffee.com",
  "bajarangbalisareehouse.in",
  "basta-india.com",
  "bastaforindia.com",
  "batteryexpress.in",
  "bazaarbokaro.in",
  "bishandayalinderchandjewellers.com",
  "blacktickets.in",
  "blinkit.com",
  "blush-tree.in",
  "bongbutiq.com",
  "booksread.in",
  "bozos.in",
  "bringmyflowers.com",
  "brokeragefreeproperty.com",
  "cakesbuffet.com",
  "calcatian.com",
  "camart.org",
  "camdin.in",
  "canabeanscoffee.com",
  "carebeauty.in",
  "cbdonline.co.in",
  "christophersstore.in",
  "coolmade.co.in",
  "courtyardjeans.com",
  "cozwaay.com",
  "damensch.com",
  "dearprincess.in",
  "debaknife.com",
  "delightnuts.in",
  "departmentalcooperativestore.com",
  "dhruverse.com",
  "dolindecor.com",
  "dotdid.in",
  "dryfruitcool.com",
  "everypiecemeat.in",
  "flowersubscriptiongurgaon.com",
  "fresh-bazar.in",
  "freshdeli.co.in",
  "fso1st.com",
  "galaxypetneeds.in",
  "getshitdone.in",
  "ghasitaram.in",
  "glenandspetstore.com",
  "glogz.co.nz",
  "gloriousjewels.net",
  "grayon.store",
  "gurukripabartanbhandar.com",
  "happychops.in",
  "havenuts.in",
  "herritotpets.com",
  "hindustanfood.in",
  "hindustanpowers.com",
  "hotmenu.in",
  "hubse.in",
  "hudle.in",
  "hungerbox.com",
  "hypd.store",
  "ilahistore.com",
  "impactguru.com",
  "inhalexhale.in",
  "inkitchenstore.com",
  "iympotech.com",
  "jalaramdairyfarm.com",
  "juspay.in",
  "justickets.in",
  "justmypups.in",
  "khaikhaikolkata.com",
  "kidzapp.in",
  "kidzzville.com",
  "kirtilals.com",
  "kwalitybookco.in",
  "laddudevi.com",
  "legacyemart.com",
  "lelodigital.com",
  "letrush.net",
  "littleboxonline.com",
  "lumberprince.com",
  "madrashotandcoldbakery.com",
  "manpasandspices.com",
  "maujis.com",
  "meddo.in",
  "mehniyajewelry.com",
  "melwach.com",
  "mimino.in",
  "mincpro.com",
  "mini.store",
  "miracledryfruit.com",
  "mitrasena.com",
  "mkspetcaree.in",
  "modernelectricvehicles.com",
  "mohammedstoresltd.com",
  "momcaresforbaby.in",
  "moodyfoodie.co.in",
  "mridatraditionalpottery.com",
  "msdorganicfirm.in",
  "mukhi.com",
  "mybulkdeal.com",
  "mygrofer.com",
  "mypocketmeal.com",
  "myra.app",
  "myramed.in",
  "mytrident.com",
  "nanisgarden.in",
  "nationalfurnitureindia.co.in",
  "naturaahar.com",
  "navjeevanplus.com",
  "nawabibiryani.co",
  "ndhgo.com",
  "neworldestore.com",
  "nostalgiaindia.com",
  "nr-fashion.in",
  "orawk.com",
  "padmavathidryfruits.com",
  "phoenixenterprisesllc.org",
  "pistonpowers.com",
  "piuscollection.in",
  "pocketmeal99.com",
  "poornamfarms.com",
  "porkmama.com",
  "pristinemart.co.in",
  "purrfectpetsstore.com",
  "pvrcinemas.com",
  "rairatan.in",
  "rajdhanifoodexpress.in",
  "ranubalasareekuthir.in",
  "rasafamart.com",
  "rasitrading.com",
  "readbooks.in",
  "realsusd.com",
  "reeashindia.com",
  "regalcinemascalicut.in",
  "revazone.com",
  "rksmartworld.co.in",
  "saisindhinamkeenandsnacks.com",
  "sanroveone.com",
  "sanware.co.in",
  "sarojjain.com",
  "satyanarayanstores.com",
  "seplmart.com",
  "seventhelement.in",
  "shahstores.in",
  "shano.in",
  "shivadatta.com",
  "shivshaktigrocery.com",
  "shoppersjoy.in",
  "shreekrishnam.co",
  "shriniwasshoopykupwad.in",
  "sindharam.com",
  "sobest.in",
  "sonastore.in",
  "sosh.store",
  "soyafair.com",
  "spicejet.com",
  "spicinemas.in",
  "strengthbay.com",
  "sudarshanbhandar.in",
  "sunrajsupermarkets.com",
  "supermillets.com",
  "swastikafashion.com",
  "swipemarts.com",
  "takemehome.in",
  "taste-great.com",
  "teakay.co.in",
  "tendercuts.in",
  "thehouseofameliorate.in",
  "thepremiumstores.com",
  "thesuprmart.in",
  "ticket.guru",
  "tiffinhouse.in",
  "treatsfrozen.com",
  "tribalveda.in",
  "trustott.store",
  "tuktukikidswear.in",
  "tvbhomes.in",
  "twobazar.com",
  "unisports.in",
  "uplandsalt.com",
  "upyogiagrofood.com",
  "vayuapparel.com",
  "vedantu.com",
  "vishalmodernstore.com",
  "warangalmarket.com",
  "wheretoogo.in",
  "wishesindia.co.in",
  "wowdiscountbazaar.com",
  "yashadiorganic.com",
  "yourspice.in",
  "zestmoney.in",
  "travelhub365.com",
  "flows.tw",
  "betterbeer.com",
  "meiiyo.com",
  "cleverclogsmultimedia.com",
  "clavei.es",
  "roadcube.club",
  "fiootv.com",
  "airtham.com",
  "profitoutdoorliving.com",
  "moransliquorstore.com",
  "chrisgrahammastering.com",
  "kathycrabbhannah.com",
  "shinybot.com",
  "ourstompingground.org",
  "hypester.org",
  "musicteacher.directory",
  "yoursocialmediaqueen.com",
  "leopardservice.eu",
  "intelcenter.com",
  "remo.co",
  "alastingstrength.net",
  "sendboard.com",
  "vesscomm.com",
  "masterpiecex.com",
  "ibsintelligence.com",
  "interplayafrica.com",
  "knibbs.com",
  "capaciotalent.com",
  "thnk.com",
  "thompsontechno.com",
  "banquepopulaire.fr",
  "idealratings.com",
  "tablefour.ca",
  "filmworkz.com",
  "beatvenues.be",
  "dpcomputertech.com",
  "saasmonks.in",
  "coffeeannan.com",
  "onsitehelpdesk.com",
  "food2soil.net",
  "expedienttechnology.com",
  "getubu.com",
  "chargebee.com",
  "triniteq.com",
  "photerloo.com",
  "genia.chat",
  "musekits.com",
  "nicholstek.com",
  "861productionsinc.com",
  "87pixels.com",
  "thefanstop.com",
  "chinuki.de",
  "bevo.media",
  "nuvebs.com",
  "clerk.io",
  "jordanitsolutions.com",
  "atypicalit.com",
  "goshopkey.com",
  "edificeapp.in",
  "l33tcomputing.com",
  "deseretbook.com",
  "thelexo.club",
  "applesandpearsbox.com",
  "bigbangattack.com",
  "patryanofficial.com",
  "salesinnovator.com",
  "insiderperks.com",
  "leobroadband.co.uk",
  "rubiq-cnc.ro",
  "feindcoffee.com",
  "breastcancerhawaii.org",
  "firstnet.co.za",
  "more4lessplans.ca",
  "bastidafarina.com",
  "ifixtech.com",
  "preventcoldsoresupplement.com",
  "csorex.com",
  "aricabinets.com",
  "theflyy.com",
  "anafra.net",
  "multimerce.co",
  "boxie24.com",
  "maneno.co.uk",
  "mecaca.com",
  "studiosight.com",
  "peak-play.net",
  "vehicleforgood.com",
  "totalpartyplanner.com",
  "aldermanassociates.com",
  "andreapallotta.it",
  "txp.tech",
  "capitaltrade247.com",
  "modelboard.net",
  "dragonwifi.com",
  "globalpayrollassociation.com",
  "fermentedatl.com",
  "firstclasscreditrepair.com",
  "mobilestorm.com",
  "monrovia.com",
  "moonvalleynurseries.com",
  "motorsportreg.com",
  "mountainroseherbs.com",
  "mscdirect.com",
  "municode.com",
  "mychoicesoftware.com",
  "mychristiancare.org",
  "mylaps.com",
  "mytime.com",
  "1stsource.com",
  "48hrbooks.com",
  "babbel.com",
  "bakerspride.com",
  "balmoralhall.com",
  "balneol.com",
  "baytown.org",
  "bcgreenhouses.com",
  "beaconhillstaffing.com",
  "beaconlive.com",
  "bedsonline.com",
  "beehively.com",
  "beeline.com",
  "bellperformance.com",
  "bentsenpalm.com",
  "berrysprings.com",
  "berteramotors.com",
  "bibank.com",
  "biggreenegg.com",
  "bioplusrx.com",
  "biotechniques.com",
  "birdbarrier.com",
  "bishs.com",
  "bjtonline.com",
  "bloomfieldtwpnj.com",
  "blueport.com",
  "bluetooth.com",
  "bluhomes.com",
  "boardsource.org",
  "boomtownroi.com",
  "bplans.com",
  "bridgetree.com",
  "brightviewseniorliving.com",
  "brother.co.jp",
  "btcbroadband.com",
  "buildcentral.com",
  "bupa.com.au",
  "buybooksontheweb.com",
  "cablemanagementusa.com",
  "calchamber.com",
  "californiahealthline.org",
  "cam-do.com",
  "campkesem.org",
  "canadahelps.org",
  "candid.com",
  "cantonvillagetheater.org",
  "cappa.net",
  "cbinsights.com",
  "cdcnews.com",
  "charmingsicily.com",
  "chministries.org",
  "ciirus.com",
  "cipworldwide.org",
  "cirrusinsight.com",
  "citizensenergygroup.com",
  "classpass.com",
  "cleeng.com",
  "cleverdevices.com",
  "cloudflare.com",
  "clubautomation.com",
  "colsoncenter.org",
  "columbiasouthern.edu",
  "comforcare.com",
  "commercialintegrator.com",
  "commpartners.com",
  "communityfirstfl.org",
  "completecareshop.co.uk",
  "coniferhealth.com",
  "consolidatedccu.com",
  "constructiononline.com",
  "constructionsuperconference.com",
  "constructionwire.com",
  "consult-pro.com",
  "conteches.com",
  "corelogic.com",
  "correlate.com",
  "cranfield.ac.uk",
  "crengland.com",
  "crmls.org",
  "crossvale.com",
  "crossvilleinc.com",
  "cuna.org",
  "customwheeloffset.com",
  "cxloyalty.com",
  "cypruscu.com",
  "kameleoon.com",
  "karastan.com",
  "kawasakipartshouse.com",
  "kbbonline.com",
  "funspot.com",
  "galaxydigital.com",
  "gardengatemagazine.com",
  "gentechscientific.com",
  "georgiawatertanks.com",
  "getambassador.com",
  "gfjules.com",
  "glhomes.com",
  "globalsportsjobs.com",
  "gobluetours.com",
  "gogreenlightenergy.com",
  "goingawesomeplaces.com",
  "grand.co.us",
  "groomerschoice.com",
  "guardianinterlock.com",
  "gunstar.co.uk",
  "gutterglove.com",
  "gvtc.com",
  "palmettovacationrentals.com",
  "paloalto.com",
  "paubox.com",
  "pcc.edu",
  "peralta.edu",
  "petwellbeing.com",
  "pgcbasketball.com",
  "phillymag.com",
  "phobs.net",
  "phpmedia.com",
  "pinotspalette.com",
  "planning.org",
  "pny.com",
  "portsmouthva.gov",
  "powerfilmsolar.com",
  "ppines.com",
  "pr.co",
  "pricespider.com",
  "privy.com",
  "prlabs.com",
  "proactrx.com",
  "proliteracy.org",
  "propertyradar.com",
  "prospertx.gov",
  "psionline.com",
  "psychcongress.com",
  "pueblo.us",
  "pueblowestmetro.com",
  "qualitywatertreatment.com",
  "quickparts.com",
  "warn.com",
  "wasatchpeaks.com",
  "watermillcaterers.com",
  "weberknapp.com",
  "weboost.com",
  "webstorepackage.com",
  "wellbridge.com",
  "westpointtb.com",
  "whittierhealth.com",
  "whoi.edu",
  "wichita.gov",
  "windowgenie.com",
  "windowsonwashington.net",
  "winspireme.com",
  "wipenew.com",
  "wootric.com",
  "worksharptools.com",
  "wrightsmedia.com",
  "xexec.com",
  "xola.com",
  "xpel.com",
  "xybix.com",
  "xyngular.com",
  "yatco.com",
  "youfit.com",
  "yourarborhome.com",
  "ytc.com",
  "aacc.net",
  "abacuslaw.com",
  "absglobal.com",
  "accessdevelopment.com",
  "acculynx.com",
  "acemart.com",
  "admail.net",
  "afcpe.org",
  "airvent.com",
  "allamericanspeakers.com",
  "allindustrial.com",
  "alphagraphics.com",
  "alphasoftware.com",
  "alside.com",
  "amazingsellingmachine.com",
  "americanframe.com",
  "americanroadmagazine.com",
  "americaschristiancu.com",
  "amicusattorney.com",
  "annefontaine.com",
  "antvoice.com",
  "anydesk.com",
  "apcu.com",
  "apihealthcare.com",
  "applied.com",
  "appraisers.org",
  "aputure.com",
  "arcticcatpartshouse.com",
  "arizonafederal.org",
  "asdonline.com",
  "asreb.com",
  "asta.org",
  "augsburgfortress.org",
  "awsm.com",
  "ayahealthcare.com",
  "aynrand.org",
  "ayusa.org",
  "edensrx.com",
  "edisonlearning.com",
  "edsby.com",
  "educationfirstfcu.org",
  "eflorist.co.uk",
  "efundraisingconnections.com",
  "eksobionics.com",
  "emmi.com",
  "emt-national-training.com",
  "enchanted-fairies.com",
  "endeavor.org",
  "epiloglaser.com",
  "erieri.com",
  "everythingeq.com",
  "evoice.com",
  "exigo.com",
  "ezinspections.com",
  "machinerylubrication.com",
  "macu.edu",
  "magellanjets.com",
  "mailboxes.com",
  "mainclinicsupply.com",
  "mainstreethost.com",
  "management-one.com",
  "manning-napier.com",
  "marinemax.com",
  "masteringalchemy.com",
  "mathusee.com",
  "mckissock.com",
  "mediasite.com",
  "medreps.com",
  "membershiptoolkit.com",
  "memberzone.com",
  "merryclinic.com",
  "dashlane.com",
  "datadome.co",
  "datto.com",
  "demandbase.com",
  "deputy.com",
  "descartes.com",
  "digitalguardian.com",
  "divvy.co",
  "dnb.com",
  "docker.com",
  "docker.io",
  "docusign.com",
  "dome9.com",
  "dowjones.com",
  "drift.com",
  "druva.com",
  "dynatrace.com",
  "hackerone.com",
  "hackerrank.com",
  "har.com",
  "heapanalytics.com",
  "hearthis.at",
  "heartland.us",
  "hellosign.com",
  "hellowork.com",
  "hibob.com",
  "highspot.com",
  "homestars.com",
  "hootsuite.com",
  "hopin.com",
  "housecallpro.com",
  "hpe.com",
  "hrbreakingnews.com",
  "hypr.com",
  "lastpass.com",
  "leadid.com",
  "leadsrx.com",
  "learnplatform.com",
  "linux.com",
  "linuxfoundation.org",
  "litmus.com",
  "liveramp.com",
  "livestream.com",
  "logdna.com",
  "logicmonitor.com",
  "logz.io",
  "lookout.com",
  "lotlinx.com",
  "lucid.app",
  "lucidchart.com",
  "lunalabs.io",
  "radar.io",
  "ramseysolutions.com",
  "rapid7.com",
  "rapidapi.com",
  "rdstation.com.br",
  "readingplus.com",
  "redcanary.co",
  "redhat.com",
  "remind.com",
  "researchnow.com",
  "retargetly.com",
  "revolut.com",
  "ringcentral.com",
  "rioseo.com",
  "rippling.com",
  "riverbed.com",
  "rocketcyber.com",
  "rockwellautomation.com",
  "rubrik.com",
  "udacity.com",
  "ultimaker.com",
  "untappd.com",
  "upworthy.com",
  "urbanairship.com",
  "userpilot.io",
  "usertesting.com",
  "userzoom.com",
  "zapier.com",
  "zebra.com",
  "zeiss.com",
  "zixcorp.com",
  "6sense.com",
  "7shifts.com",
  "fastly.com",
  "fastly.net",
  "feathr.co",
  "figma.com",
  "fireeye.com",
  "fivetran.com",
  "flexport.com",
  "flippingbook.com",
  "fly.dev",
  "flywheelsites.com",
  "formlabs.com",
  "formstack.com",
  "fortinet.com",
  "foxit.com",
  "foxitsoftware.com",
  "frame.io",
  "freightwaves.com",
  "front.com",
  "frontlineeducation.com",
  "fujifilm.com",
  "g2.com",
  "g2crowd.com",
  "gartner.com",
  "ge.com",
  "getblueshift.com",
  "getshogun.com",
  "gitlab.com",
  "givesmart.com",
  "glassdoor.com",
  "globalwebindex.net",
  "go-vip.net",
  "gocardless.com",
  "gonitro.com",
  "govdelivery.com",
  "grammarly.com",
  "granicus.com",
  "greenhouse.io",
  "groundtruth.com",
  "paddle.com",
  "padsquad.com",
  "pagerduty.com",
  "paloaltonetworks.com",
  "pandadoc.com",
  "pandora.com",
  "pantheon.io",
  "pantheonsite.io",
  "parsely.com",
  "pax8.com",
  "paychex.com",
  "paycor.com",
  "payoneer.com",
  "payscale.com",
  "pega.com",
  "pendo.io",
  "pingidentity.com",
  "pitch.com",
  "pitchbook.com",
  "plaid.com",
  "platform.sh",
  "platformsh.site",
  "plotly.com",
  "pluralsight.com",
  "pointclickcare.com",
  "postscript.io",
  "powerschool.com",
  "powtoon.com",
  "practicefusion.com",
  "prestashop.com",
  "prnewswire.com",
  "procareconnect.com",
  "procore.com",
  "profitwell.com",
  "proofpoint.com",
  "prweb.com",
  "ptc.com",
  "puppet.com",
  "purestorage.com",
  "pushalert.co",
  "q4inc.com",
  "qlik.com",
  "qualified.com",
  "qualys.com",
  "qualys.eu",
  "quickbase.com",
  "wandera.com",
  "webengage.com",
  "webflow.com",
  "webflow.io",
  "webpt.com",
  "whatfix.com",
  "windstream.com",
  "wistia.com",
  "wordstream.com",
  "workday.com",
  "wrike.com",
  "wsj.com",
  "wyndhamhotels.com",
  "yesware.com",
  "yext.com",
  "yodlee.com",
  "yotpo.com",
  "youvisit.com",
  "absolute.com",
  "acc.org",
  "acloud.guru",
  "acquia.com",
  "activecampaign.com",
  "activehosted.com",
  "actonsoftware.com",
  "adjust.com",
  "adjust.io",
  "adobecqms.net",
  "adp.com",
  "adroll.com",
  "advancedmd.com",
  "agilebits.com",
  "eset.com",
  "esri.com",
  "etoro.com",
  "etrade.com",
  "eurodns.com",
  "evergage.com",
  "exacttarget.com",
  "excite.co.jp",
  "marktplaats.nl",
  "marriott.com",
  "mars.com",
  "mastercard.com",
  "matchesfashion.com",
  "matillion.com",
  "matterport.com",
  "mavenlink.com",
  "mediaroom.com",
  "mediaset.es",
  "melia.com",
  "mheducation.com",
  "michaels.com",
  "michelin.com",
  "microchip.com",
  "microfocus.com",
  "mimecast.com",
  "mindbodyonline.com",
  "minted.com",
  "mist.com",
  "monash.edu",
  "moodys.com",
  "msecnd.net",
  "mta.info",
  "mulesoft.com",
  "24heures.ch",
  "2ememain.be",
  "bananarepublic.com",
  "bbcollab.com",
  "beams.co.jp",
  "bedbathandbeyond.ca",
  "belmond.com",
  "belong.com.au",
  "benjerry.com",
  "bigrock.com",
  "bigrock.in",
  "bigstockphoto.com",
  "blackbaud.net",
  "bloomerang.co",
  "bluebyadt.com",
  "bluehost.in",
  "bluejeans.com",
  "blueshieldca.com",
  "bmc.com",
  "bmwusa.com",
  "bootbarn.com",
  "bostonscientific.com",
  "bpi.com.ph",
  "brandfolder.com",
  "braun.com",
  "brightspeed.com",
  "brigitte.de",
  "build.com",
  "buildabear.com",
  "bundesliga.com",
  "burton.com",
  "c6bank.com.br",
  "calvin.edu",
  "calvinklein.us",
  "campaigner.com",
  "campingworld.com",
  "canon-europe.com",
  "carfax.eu",
  "carhartt.com",
  "carwow.co.uk",
  "caseys.com",
  "casio.jp",
  "casper.com",
  "catch.com.au",
  "catchon.com",
  "centralreach.com",
  "centurylink.com",
  "cetrogar.com.ar",
  "cevalogistics.com",
  "cfainstitute.org",
  "chef.io",
  "chevron.com",
  "chicago.gov",
  "chownow.com",
  "christianlouboutin.com",
  "cincpro.com",
  "citizensbank.com",
  "cityexperiences.com",
  "claris.com",
  "classy.org",
  "cloudbeds.com",
  "cma-cgm.com",
  "cogeco.ca",
  "colehaan.com",
  "coles.com.au",
  "comunidad.madrid",
  "containerstore.com",
  "coop.co.uk",
  "coventry.ac.uk",
  "cpasitesolutions.com",
  "crazydomains.com",
  "creditkarma.ca",
  "crisistextline.org",
  "crucial.com",
  "csueastbay.edu",
  "cummins.com",
  "katespadeoutlet.com",
  "kbzpay.com",
  "kddi.com",
  "keysight.com",
  "khealth.com",
  "kikocosmetics.com",
  "kogan.com",
  "kohler.com",
  "koreanair.com",
  "netvoyage.com",
  "newark.com",
  "newbalance.com",
  "nfm.com",
  "nikonusa.com",
  "ninjatrader.com",
  "nm.gov",
  "northumbria.ac.uk",
  "northwell.edu",
  "nowtv.com",
  "nttdata.com",
  "nu.edu",
  "nyulangone.org",
  "oasis-open.org",
  "officedepot.com.mx",
  "oi.com.br",
  "oldnavy.com",
  "olxgroup.com",
  "one-line.com",
  "onsemi.com",
  "opswat.com",
  "owllabs.com",
  "tagheuer.com",
  "talabat.com",
  "talech.com",
  "teamusa.org",
  "techstars.com",
  "tfaforms.com",
  "tfaforms.net",
  "thron.com",
  "thryv.com",
  "captivate.com",
  "carbonblack.com",
  "carta.com",
  "catalent.com",
  "catalyst.io",
  "celonis.com",
  "chainalysis.com",
  "chargify.com",
  "chronosphere.io",
  "circleci.com",
  "citeline.com",
  "claroty.com",
  "clearbit.com",
  "clearcompany.com",
  "clearwateranalytics.com",
  "clickup.com",
  "clockwisemd.com",
  "clxcommunications.com",
  "cmgroup.com",
  "cobalt.io",
  "cockroachlabs.com",
  "codesignal.com",
  "cofense.com",
  "cognism.com",
  "concord.net",
  "contentstack.com",
  "contrastsecurity.com",
  "controlup.com",
  "convio.com",
  "copado.com",
  "coralogix.com",
  "cority.com",
  "cribl.io",
  "crownpeak.com",
  "cypress.io",
  "kaltura.com",
  "kareo.com",
  "kasasa.com",
  "keeptruckin.com",
  "kindful.com",
  "kornferry.com",
  "n-able.com",
  "namely.com",
  "natterbox.com",
  "navex.com",
  "navex01.com",
  "navexglobal.com",
  "ncino.com",
  "netbase.com",
  "netlify.app",
  "netlify.com",
  "netradyne.com",
  "netscout.com",
  "netskope.com",
  "newscred.com",
  "nextgen.com",
  "nightfall.ai",
  "ninjaone.com",
  "nylas.com",
  "octanner.com",
  "octopus.com",
  "oforce.com",
  "onfido.com",
  "onfido.xyz",
  "ooma.com",
  "opencities.com",
  "opendns.com",
  "openforms.com",
  "orca.security",
  "orcasecurity.io",
  "order2cash.com",
  "ownbackup.com",
  "owndata.com",
  "oysterhr.com",
  "talend.com",
  "talkdesk.com",
  "talkwalker.com",
  "taskstream.com",
  "taskus.com",
  "taxamo.com",
  "teachforamerica.org",
  "tebra.com",
  "techinsights.com",
  "technologyadvice.com",
  "techpilotlabs.com",
  "techvalidate.com",
  "telmediq.com",
  "temporal.io",
  "thehackettgroup.com",
  "thinkful.com",
  "thinkingphones.com",
  "threatconnect.com",
  "thunderhead.com",
  "thycotic.com",
  "tipalti.com",
  "traackr.com",
  "transflo.com",
  "brightlifedirect.com",
  "brooklynmuseum.org",
  "brownetrading.com",
  "browning.com",
  "budlight.com",
  "buffalobills.com",
  "bulbamerica.com",
  "bulletsafe.com",
  "buybuybaby.com",
  "buzzfeed.com",
  "bwca.com",
  "c21stores.com",
  "canadiantire.ca",
  "carolehochman.com",
  "caswellmassey.com",
  "cdprojektred.com",
  "cedarcide.com",
  "celinedion.com",
  "cellularoutfitter.com",
  "centuryfurniture.com",
  "channelmaster.com",
  "charmingcharlie.com",
  "chick-fil-a.com",
  "chronicle.com",
  "circuitspecialists.com",
  "citysports.com",
  "clifbar.com",
  "cobra.com",
  "coffeeforless.com",
  "completenutrition.com",
  "compressionsale.com",
  "compressionstockings.com",
  "connectsense.com",
  "cookwoods.com",
  "corvetteforum.com",
  "countrymusichalloffame.org",
  "crossfit.com",
  "crownwineandspirits.com",
  "cuddlduds.com",
  "cutleryandmore.com",
  "cynthiarowley.com",
  "k-y.com",
  "kerusso.com",
  "kmart.com",
  "knotandrope.com",
  "koyalwholesale.com",
  "kttape.com",
  "kylie.com",
  "naturecity.com",
  "naturessleep.com",
  "nemoequipment.com",
  "netrition.com",
  "newbeauty.com",
  "newglarusbrewing.com",
  "newvitality.com",
  "newyorkdress.com",
  "newyorker.com",
  "nike.com",
  "ninasimone.com",
  "ninewest.com",
  "nokia.com",
  "northernbrewer.com",
  "nusports.com",
  "nutrabio.com",
  "nytimes.com",
  "ocearch.org",
  "oldtimecandy.com",
  "onefastcat.com",
  "oneida.com",
  "onlynaturalpet.com",
  "optcorp.com",
  "orbitonline.com",
  "outdoorresearch.com",
  "outdoorsolarstore.com",
  "outdoortechnology.com",
  "outlanderstore.com",
  "overhalfsale.com",
  "oxyfresh.com",
  "tableclothsfactory.com",
  "tandyleather.com",
  "taylorswift.com",
  "tcpglobal.com",
  "teaforte.com",
  "teefury.com",
  "territorialseed.com",
  "tetongravity.com",
  "thechivery.com",
  "thehockeyshop.com",
  "thehomesecuritysuperstore.com",
  "theinsolestore.com",
  "thelooploft.com",
  "theporchswingcompany.com",
  "therafitshoe.com",
  "thesynergycompany.com",
  "theteaspot.com",
  "thetruthaboutcancer.com",
  "thewalkingcompany.com",
  "thorlo.com",
  "tibco.com",
  "tonyrobbins.com",
  "topatoco.com",
  "tower.com",
  "tp-link.com",
  "traceminerals.com",
  "trailcampro.com",
  "travelproluggageoutlet.com",
  "trendenterprises.com",
  "trickers.com",
  "trudog.com",
  "trytheworld.com",
  "tuesdaymorning.com",
  "tuftandneedle.com",
  "tupperware.com",
  "ifit.com",
  "ima-usa.com",
  "ims.com",
  "in-n-out.com",
  "indycar.com",
  "inspiredsilver.com",
  "integrativehealthcare.com",
  "jackerwin.com",
  "jacksongalaxy.com",
  "jackthreads.com",
  "jbonamassa.com",
  "jeffgordon.com",
  "jenniferfurniture.com",
  "jny.com",
  "johnedward.net",
  "johnfrieda.com",
  "johnnie-o.com",
  "jrwatkins.com",
  "juicebeauty.com",
  "julep.com",
  "safariland.com",
  "salonguys.com",
  "save-on-crafts.com",
  "schachtspindle.com",
  "sciencemuseum.org.uk",
  "seahawks.com",
  "sealskincovers.com",
  "sears.com",
  "seattlemet.com",
  "sennheiser.com",
  "sentrysafe.com",
  "seriousskincare.com",
  "serta.com",
  "shaniatwain.com",
  "shimano.com",
  "shopbeam.com",
  "shopharveys.com",
  "sailthru.com",
  "sante.fr",
  "saturn.de",
  "savethechildren.org.uk",
  "scoopearth.com",
  "screamingfrog.co.uk",
  "seasaltcornwall.com",
  "secrel.com.br",
  "securetrust.com",
  "seeedstudio.com",
  "segway.com",
  "semarangkota.go.id",
  "sematext.com",
  "sendlane.com",
  "sheerid.com",
  "shipengine.com",
  "shiphero.com",
  "shippingeasy.com",
  "shoppinglive.ru",
  "shoprenter.hu",
  "shoptet.cz",
  "sift.com",
  "sigecloud.com.br",
  "sil.org",
  "sistemi.com",
  "skokka.com",
  "skroutz.gr",
  "smartfren.com",
  "snsm.org",
  "soas.ac.uk",
  "socialmediaweek.org",
  "soldejaneiro.com",
  "sorenson.com",
  "southampton.ac.uk",
  "speakol.com",
  "spigen.com",
  "sportslogos.net",
  "spyropress.com",
  "stanforddaily.com",
  "statueofliberty.org",
  "stoiximan.gr",
  "studiesweekly.com",
  "stylemixthemes.com",
  "sunchemical.com",
  "superbthemes.com",
  "surabaya.go.id",
  "swcp.com",
  "szallas.hu",
  "ventsmagazine.com",
  "vietnamairlines.com",
  "virtualmin.com",
  "vnpt.vn",
  "vwthemes.com",
  "dahuasecurity.com",
  "dailytarheel.com",
  "dandb.com",
  "datenschutz-generator.de",
  "davidjones.com",
  "decathlon.es",
  "decathlon.it",
  "decathlon.pl",
  "decathlon.pt",
  "degentevakana.com",
  "designhill.com",
  "designmodo.com",
  "dishawaves.com",
  "dlkmodas.com.br",
  "dogster.com",
  "dossier.co",
  "drmax.cz",
  "dynabook.com",
  "hapara.com",
  "hashthemes.com",
  "heanet.ie",
  "hechingerreport.org",
  "hellomood.co",
  "historyhit.com",
  "hoka.com",
  "holafly.com",
  "homewizard.com",
  "hostingpalvelu.fi",
  "hsnstore.com",
  "hugendubel.de",
  "labiennale.org",
  "ladn.eu",
  "lakeheadu.ca",
  "lamag.com",
  "lareviewofbooks.org",
  "lasillavacia.com",
  "lavoixdunord.fr",
  "lcl.fr",
  "leeds.gov.uk",
  "legimi.pl",
  "leroymerlin.es",
  "libertyfund.org",
  "libraryjournal.com",
  "libreriauniversitaria.it",
  "lightinfitness.com",
  "liliputing.com",
  "linda.nl",
  "lingokids.com",
  "liquidweb.com",
  "longreads.com",
  "loopia.se",
  "lp.org",
  "luxottica.com",
  "lyrathemes.com",
  "ranepa.ru",
  "rankmath.com",
  "realitysandwich.com",
  "reclaimhosting.com",
  "resellerclub.com",
  "resellerratings.com",
  "resi.io",
  "resilience.org",
  "revealnews.org",
  "revlifter.com",
  "rightinbox.com",
  "ripleys.com",
  "route.com",
  "royalcbd.com",
  "rtvnoord.nl",
  "rtvs.sk",
  "rushlimbaugh.com",
  "prefeitura.rio",
  "primorski.eu",
  "privateequityinternational.com",
  "provacan.co.uk",
  "psicologiaviva.com.br",
  "pucv.cl",
  "purplesec.us",
  "qroo.gob.mx",
  "qualenergia.it",
  "watchgang.com",
  "waukeshacounty.gov",
  "webnots.com",
  "weddingideasmag.com",
  "wedevs.com",
  "welltrainedmind.com",
  "wels.net",
  "whiting-turner.com",
  "wigzo.com",
  "willux.be",
  "wipfandstock.com",
  "witness.org",
  "wmm.com",
  "woorise.com",
  "wyofile.com",
  "yaf.org",
  "yoga-vidya.de",
  "youngfarmers.org",
  "yuengling.com",
  "abacus.coop",
  "abta.org",
  "accushield.com",
  "acdlabs.com",
  "acfc.com.vn",
  "acornfinance.com",
  "acymailing.com",
  "aestheticrecord.com",
  "affordableagility.com",
  "aheliotech.com",
  "aij.or.jp",
  "alansfactoryoutlet.com",
  "alltech.com",
  "almaceneselrey.com",
  "alphalion.com",
  "alzfdn.org",
  "amyporterfield.com",
  "andrerieu.com",
  "aph.org",
  "aplikuj.pl",
  "apogeedigital.com",
  "appsero.com",
  "apymsa.com.mx",
  "ard.fr",
  "arenacommerce.com",
  "armurerie-auxerre.com",
  "arnos.gr",
  "asmp.org",
  "atheists.org",
  "athletic-club.eus",
  "atlona.com",
  "autoplanet.cl",
  "e2esoft.com",
  "ecosmetics.com",
  "ecuad.ca",
  "edugorilla.com",
  "eeweb.com",
  "efor.es",
  "ehlers-danlos.com",
  "eightysixbrand.com",
  "electronics-lab.com",
  "eleostech.com",
  "ellibero.cl",
  "ellisisland.org",
  "emlid.com",
  "emotiv.com",
  "endoca.com",
  "optimonk.com",
  "ordergroove.com",
  "ourcrowd.com",
  "tctmagazine.com",
  "tdn.com",
  "teamexos.com",
  "telerik.com",
  "texastribune.org",
  "theabscompany.com",
  "theeagle.com",
  "thefranklinnewspost.com",
  "thegrocer.co.uk",
  "theindependent.com",
  "thesouthern.com",
  "thetandd.com",
  "thetradedesk.com",
  "thrivehive.com",
  "tinyeye.com",
  "tradablebits.com",
  "transact.com",
  "translationzone.com",
  "trc-canada.com",
  "treasuredata.com",
  "trendhunter.com",
  "trib.com",
  "triggeredmessaging.com",
  "triptease.com",
  "tru-d.com",
  "trustpilot.com",
  "truthinit.com",
  "tssbulletproof.com",
  "tucson.com",
  "tulsaworld.com",
  "twilio.com",
  "360alumni.com",
  "icba.org",
  "icrealtime.com",
  "idinamenzel.com",
  "ignitermedia.com",
  "ignitespot.com",
  "ilpost.it",
  "imanet.org",
  "imaonlinestore.com",
  "imegonline.com",
  "import.io",
  "independenttribune.com",
  "indsci.com",
  "inductiveautomation.com",
  "inetco.com",
  "innocentive.com",
  "instapage.com",
  "instructure.com",
  "integralads.com",
  "intenthq.com",
  "ipswitchft.com",
  "iqor.com",
  "ivp.com",
  "iwcc.edu",
  "janes.com",
  "jbu.edu",
  "jeremygutsche.com",
  "jobscore.com",
  "joneslanglasalle.com",
  "journalnow.com",
  "journalstar.com",
  "journaltimes.com",
  "jukinmedia.com",
  "just-auto.com",
  "just-style.com",
  "safely.com",
  "salsify.com",
  "savigent.com",
  "savvymoney.com",
  "schwansfoodservice.com",
  "scnow.com",
  "seagulllightinglights.com",
  "ship-technology.com",
  "siemens.com",
  "signalandpower.com",
  "silverbullion.com.sg",
  "similarweb.com",
  "siouxcityjournal.com",
  "skilljar.com",
  "slack.com",
  "slashdotmedia.com",
  "smartsheet.com",
  "smithmountainlake.com",
  "socialtyze.com",
  "software.com",
  "softwareadvice.com",
  "soniclear.com",
  "sonicprint.com",
  "splunk.com",
  "spreedly.com",
  "stackla.com",
  "starherald.com",
];
let millionWebPageUrls = [];

for (let i = 0; i < 1; i++) {
  millionWebPageUrls = millionWebPageUrls.concat(temp);
}

let i = 0;

async function scrapePage({ page, data: { url, cluster } }) {
  try {
    await page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      if (
        interceptedRequest.resourceType() === "image" ||
        interceptedRequest.resourceType() === "stylesheet" ||
        interceptedRequest.resourceType() === "font"
      ) {
        interceptedRequest.abort();
        return;
      } else interceptedRequest.continue();
    });
    // console.time("https://" + url);
    await page.goto("https://" + url, { waitUntil: "domcontentloaded" });
    //console.timeEnd("https://" + url);
    const html = await page.content();
    const links = extractSocialMediaLinks(html);

    cluster.emit("taskfinished", links, html);
    return "data";
  } catch (e) {
    // console.timeEnd("https://" + url);
    cluster.emit("taskerror", e);
  }
}

async function startScraping(urls, maxConcurrency) {
  const unknownErrors = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: maxConcurrency,
    puppeteerOptions: { headless: "new", ignoreHTTPSErrors: true },
    monitor: true,
    timeout: 30000,
  });

  for (let url of urls) {
    cluster.queue({ url, cluster }, scrapePage);
  }

  cluster.on("taskfinished", async (links, html) => {
    unknownErrors.push({
      rowNo: 0,
      name: "http://domain.com",
      message: "script not found after getting script exits error",
    });
    // const domainScripts = html
    //   ? Array.from(new Set(this.getScripts(html, domain)))
    //   : [];
  });

  cluster.on("taskerror", (err, data) => {
    unknownErrors.push({
      rowNo: 0,
      name: "http://domain.com",
      message: "script not found after getting script exits error",
    });
  });

  cluster.on("taskfailed", (task, error) => {
    //console.error(`Failed processing ${task.data}:`, error);
  });

  // Queue initial web pages
  // for (let i = 0; i < maxConcurrency; i++) {
  //   const url = urls.shift();
  //   if (url) {
  //     //  console.log(`Adding ${url} to the queue for scraping.1`);
  //     await cluster.queue({ url, cluster }, scrapePage);
  //   }
  // }
  //console.log("unknownErrors=", unknownErrors);

  await cluster.idle();
  //  console.log("unknownErrors=", unknownErrors);
  await cluster.close();
}

function extractSocialMediaLinks(html) {
  const $ = cheerio.load(html);
  const socialMediaLinks = [];

  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (href) {
      if (isLinkedInLink(href)) {
        socialMediaLinks.push({ link: href, type: "SocialMediaType.LINKEDIN" });
      } else if (isInstagramLink(href)) {
        socialMediaLinks.push({
          link: href,
          type: "SocialMediaType.INSTAGRAM",
        });
      } else if (isFacebookLink(href)) {
        socialMediaLinks.push({ link: href, type: "SocialMediaType.FACEBOOK" });
      } else if (isTikTokLink(href)) {
        socialMediaLinks.push({ link: href, type: "SocialMediaType.TIKTOK" });
      } else if (isTwitterLink(href)) {
        socialMediaLinks.push({ link: href, type: "SocialMediaType.TWITTER" });
      }
    }
  });

  return socialMediaLinks;
}

function isLinkedInLink(url) {
  return url.includes("linkedin.com");
}

function isInstagramLink(url) {
  return url.includes("instagram.com");
}

function isTwitterLink(url) {
  return url.includes("twitter.com");
}

function isFacebookLink(url) {
  return url.includes("facebook.com");
}

function isTikTokLink(url) {
  return url.includes("tiktok.com");
}

function getScripts(html, domain) {
  const scriptUrls = [];

  const $ = load(html);
  const scriptTags = $("script");
  scriptTags.each((index, element) => {
    const src = $(element).attr("src");
    if (src && !src.includes(domain)) {
      try {
        const url = new URL(src);
        const urlWithoutParams = `${url.origin}${url.pathname}`;
        scriptUrls.push(urlWithoutParams);
      } catch (error) {
        //
      }
    }
  });

  return scriptUrls;
}

startScraping(millionWebPageUrls, 30);
