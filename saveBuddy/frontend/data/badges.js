import BasisEhboBadge from "../assets/images/badges/vier-stappen.png";
import ReanimerenBadge from "../assets/images/badges/reanimeren.png";
import VerslikkingBadge from "../assets/images/badges/verslikking.png";
import HuidwondeBadge from "../assets/images/badges/huidwonde.png";
import BrandwondeBadge from "../assets/images/badges/brandwonde.png";
import BloedingBadge from "../assets/images/badges/bloeding.png";
import LetselsBadge from "../assets/images/badges/letsels.png";
import VergiftigingBadge from "../assets/images/badges/vergiftiging.png";
import VerdrinkingBadge from "../assets/images/badges/verdrinking.png";
import AllesVoltooidBadge from "../assets/images/badges/allesvoltooid.png";
import SnelleLeerderBadge from "../assets/images/badges/snelleleerder.png";
import LessenVoltooidBadge from "../assets/images/badges/lessenvoltooid.png";
import StreakBadge from "../assets/images/badges/streak.png";

export const badges = [
    {
        id: 1,
        Image: BasisEhboBadge,
        slug: "vierStappen",
        title: "Vier stappen in eerste hulp",
        description: "Voltooi de vier stappen in eerste hulp les",
        locked: false,
    },
    {
        id: 2,
        Image: ReanimerenBadge,
        slug: "reanimeren",
        title: "Reanimeren",
        description: "Voltooi de reanimatie les",
        locked: false,
    },
    {
        id: 3,
        Image: VerslikkingBadge,
        slug: "verslikking",
        title: "Verslikking",
        description: "Voltooi de verslikking les",
        locked: true,
    },
    {
        id: 4,
        Image: HuidwondeBadge,
        slug: "huidwonde",
        title: "Huidwonde",
        description: "Voltooi de huidwonde les",
        locked: true,
    },
    {
        id: 5,
        Image: BrandwondeBadge,
        slug: "brandwonde",
        title: "Brandwonde",
        description: "Voltooi de brandwonde les",
        locked: true,
    },
    {
        id: 6,
        Image: BloedingBadge,
        slug: "bloeding",
        title: "Bloeding",
        description: "Voltooi de bloeding les",
        locked: true,
    },
    {
        id: 7,
        Image: LetselsBadge,
        slug: "letsels",
        title: "Letsels",
        description: "Voltooi de letsels les",
        locked: true,
    },
    {
        id: 8,
        Image: VergiftigingBadge,
        slug: "vergiftiging",
        title: "Vergiftiging",
        description: "Voltooi de vergiftiging les",
        locked: true,
    },
    {
        id: 9,
        Image: VerdrinkingBadge,
        slug: "verdrinking",
        title: "Verdrinking",
        description: "Voltooi de verdrinking les",
        locked: true,
    },
    {
        id: 10,
        Image: SnelleLeerderBadge,
        slug: "snelleLeerder",
        title: "Snelle leerder",
        description: "Voltooi een les binnen 10 minuten",
        locked: true,
    },
    {
        id: 11,
        Image: LessenVoltooidBadge,
        slug: "lessenVoltooid",
        title: "Lessen voltooid",
        description: "Voltooi 5 lessen",
        locked: true,
    },
    {
        id: 12,
        Image: StreakBadge,
        slug: "streak",
        title: "Streak",
        description: "Kom 3 dagen achter elkaar terug",
        locked: true,
    },
    {
        id: 13,
        Image: AllesVoltooidBadge,
        slug: "allesVoltooid",
        title: "Alles voltooid",
        description: "Voltooi alle lessen",
        locked: true,
    }
];