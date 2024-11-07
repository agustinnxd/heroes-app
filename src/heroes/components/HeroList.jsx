import { useMemo } from "react";
import { getHeroByPublisher } from "../helpers"
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {

    const heroes = useMemo( () => getHeroByPublisher(publisher), [publisher] );

    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3">
            {
                heroes.map(hero => {
                    return (
                        <HeroCard
                            key={hero.id}
                            {...hero}
                        />
                    )
                })
            }
        </div>
    )
}
