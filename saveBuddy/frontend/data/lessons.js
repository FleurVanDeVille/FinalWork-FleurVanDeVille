import VierStappen from "../assets/images/vier-stappen.svg";
import Reanimeren from "../assets/images/reanimeren.svg";
import Verslikking from "../assets/images/verslikking.svg";
import Huidwonde from "../assets/images/huidwonde.svg";
import Brandwonde from "../assets/images/brandwonde.svg";
import Bloeding from "../assets/images/bloeding.svg";
import Letsels from "../assets/images/letsels.svg";
import Vergiftiging from "../assets/images/vergiftiging.svg";
import Verdrinking from "../assets/images/verdrinking.svg";

export const lessen = [
  {
    id: 1,
    Image: VierStappen,
    slug: "vierStappen",
    title: "Vier stappen in eerste hulp",
    duration: "10 min",
    progress: 60,
    locked: false,
  },
  {
    id: 2,
    Image: Reanimeren,
    slug: "reanimeren",
    title: "Reanimeren",
    duration: "15 min",
    progress: 40,
    locked: false,
  },
  {
    id: 3,
    Image: Verslikking,
    slug: "verslikking",
    title: "Verslikking",
    duration: "10 min",
    progress: 0,
    locked: false,
  },
  {
    id: 4,
    Image: Huidwonde,
    slug: "huidwonde",
    title: "Huidwonde",
    duration: "10 min",
    progress: 60,
    locked: true,
  },
  {
    id: 5,
    Image: Brandwonde,
    slug: "brandwonde",
    title: "Brandwonde",
    duration: "15 min",
    progress: 40,
    locked: true,
  },
  {
    id: 6,
    Image: Bloeding,
    slug: "bloeding",
    title: "Bloeding",
    duration: "10 min",
    progress: 0,
    locked: true,
  },
  {
    id: 7,
    Image: Letsels,
    slug: "letsels",
    title: "Letsels",
    duration: "10 min",
    progress: 60,
    locked: true,
  },
  {
    id: 8,
    Image: Vergiftiging,
    slug: "vergiftiging",
    title: "Vergiftiging",
    duration: "15 min",
    progress: 40,
    locked: true,
  },
  {
    id: 9,
    Image: Verdrinking,
    slug: "verdrinking",
    title: "Verdrinking",
    duration: "10 min",
    progress: 0,
    locked: true,
  }
];