import Alameda from "./Alameda.json";
import ContraCosta from "./ContraCosta.json";
import Marin from "./Marin.json";
import Napa from "./Napa.json";
import SanFrancisco from "./SanFrancisco.json";
import SanMateo from "./SanMateo.json";
import SantaClara from "./SantaClara.json";
import Solano from "./Solano.json";
import Sonoma from "./Sonoma.json";
import Butte from "./Butte.json";
import Colusa from "./Colusa.json";
import Glenn from "./Glenn.json";
import Placer from "./Placer.json";
import Sacramento from "./Sacramento.json";
import SanJoaquin from "./SanJoaquin.json";
import Shasta from "./Shasta.json";
import Sutter from "./Sutter.json";
import Tehama from "./Tehama.json";
import Yolo from "./Yolo.json";
import Yuba from "./Yuba.json";
import Fresno from "./Fresno.json";
import Kern from "./Kern.json";
import Kings from "./Kings.json";
import Madera from "./Madera.json";
import Merced from "./Merced.json";
import Stanislaus from "./Stanislaus.json";
import Tulare from "./Tulare.json";
import LosAngelesEast from "./LosAngelesEast.json";
import LosAngelesNorth from "./LosAngelesNorth.json";
import LosAngelesSouth from "./LosAngelesSouth.json";
import LosAngelesWest from "./LosAngelesWest.json";
import Orange from "./Orange.json";
import Riverside from "./Riverside.json";
import SanBernardino from "./SanBernardino.json";
import Ventura from "./Ventura.json";
import SanDiego from "./SanDiego.json";
import Imperial from "./Imperial.json";
import SantaBarbara from "./SantaBarbara.json";
import Monterey from "./Monterey.json";
import SanBenito from "./SanBenito.json";
import SanLuisObispo from "./SanLuisObispo.json";
import SantaCruz from "./SantaCruz.json";

const root = {
    "/": {
        "path": "/",
        "type": "root",
        "children": [ 
            "/browse/bay-area",
            "/browse/southern-california",
            "/browse/sacramento-valley",
            "/browse/san-joaquin-valley",
            "/browse/central-coast"
        ]
    }
}

const regions = {
    "/browse/bay-area": {
        "name": "Bay Area",
        "path": "/browse/bay-area",
        "type": "region",
        "color": "#76e66d",
        "children": [
            "/browse/bay-area/alameda",
            "/browse/bay-area/contra-costa",
            "/browse/bay-area/marin",
            "/browse/bay-area/napa",
            "/browse/bay-area/san-francisco",
            "/browse/bay-area/san-mateo",
            "/browse/bay-area/santa-clara",
            "/browse/bay-area/sonoma"
        ]
    },
    "/browse/sacramento-valley": {
        "name": "Sacramento Valley",
        "path": "/browse/sacramento-valley",
        "type": "region",
        "color": "#a09deb",
        "children": [
            "/browse/sacramento-valley/butte",
            "/browse/sacramento-valley/colusa",
            "/browse/sacramento-valley/glenn",
            "/browse/sacramento-valley/placer",
            "/browse/sacramento-valley/sacramento",
            "/browse/sacramento-valley/shasta",
            "/browse/sacramento-valley/solano",
            "/browse/sacramento-valley/sutter",
            "/browse/sacramento-valley/tehama",
            "/browse/sacramento-valley/yolo",
            "/browse/sacramento-valley/yuba"
        ]
    },
    "/browse/san-joaquin-valley": {
        "name": "San Joaquin Valley",
        "path": "/browse/san-joaquin-valley",
        "type": "region",
        "color": "#6db7e6",
        "children": [
            "/browse/san-joaquin-valley/fresno",
            "/browse/san-joaquin-valley/kern",
            "/browse/san-joaquin-valley/kings",
            "/browse/san-joaquin-valley/madera",
            "/browse/san-joaquin-valley/merced",
            "/browse/san-joaquin-valley/san-joaquin",
            "/browse/san-joaquin-valley/stanislaus",
            "/browse/san-joaquin-valley/tulare"
        ]
    },
    "/browse/southern-california": {
        "name": "Southern California",
        "path": "/browse/southern-california",
        "type": "region",
        "color": "#e6e66d",
        "children": [
            "/browse/southern-california/los-angeles-east",
            "/browse/southern-california/los-angeles-north",
            "/browse/southern-california/los-angeles-south",
            "/browse/southern-california/los-angeles-west",
            "/browse/southern-california/orange",
            "/browse/southern-california/riverside",
            "/browse/southern-california/san-bernardino",
            "/browse/southern-california/san-diego",
            "/browse/southern-california/imperial"
        ]
    },
    "/browse/central-coast": {
        "name": "Central Coast",
        "path": "/browse/central-coast",
        "type": "region",
        "color": "#e6e66d",
        "children": [
            "/browse/central-coast/ventura",
            "/browse/central-coast/santa-barbara",
            "/browse/central-coast/monterey",
            "/browse/central-coast/san-benito",
            "/browse/central-coast/san-luis-obispo",
            "/browse/central-coast/santa-cruz"
        ]
    }
};

export default {
    ...root,
    ...regions,
    ...Alameda,
    ...ContraCosta,
    ...Marin,
    ...Napa,
    ...SanFrancisco,
    ...SanMateo,
    ...SantaClara,
    ...Solano,
    ...Sonoma,
    ...Butte,
    ...Colusa,
    ...Glenn,
    ...Placer,
    ...SanJoaquin,
    ...Sacramento,
    ...Shasta,
    ...Sutter,
    ...Tehama,
    ...Yolo,
    ...Yuba,
    ...Fresno,
    ...Kern,
    ...Kings,
    ...Madera,
    ...Merced,
    ...Stanislaus,
    ...Tulare,
    ...LosAngelesEast,
    ...LosAngelesNorth,
    ...LosAngelesSouth,
    ...LosAngelesWest,
    ...Orange,
    ...Riverside,
    ...SanBernardino,
    ...Ventura,
    ...SanDiego,
    ...Imperial,
    ...SantaBarbara,
    ...Monterey,
    ...SanBenito,
    ...SanLuisObispo,
    ...SantaCruz
}