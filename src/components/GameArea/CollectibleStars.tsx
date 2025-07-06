import React from "react"
import { Star } from "lucide-react"
import { Collectible } from "../../types"
import { STAR_SIZE } from "../../constants/gameConstants"

interface CollectibleStarsProps {
   collectibles: Collectible[]
}

export const CollectibleStars: React.FC<CollectibleStarsProps> = ({
   collectibles,
}) => {
   return (
      <>
         {collectibles.map(
            (collectible) =>
               !collectible.collected && (
                  <div
                     key={collectible.id}
                     className='absolute transition-all duration-300 ease-out pointer-events-none'
                     style={{
                        left: collectible.position.x - STAR_SIZE / 2,
                        top: collectible.position.y - STAR_SIZE / 2,
                     }}>
                     <Star
                        size={STAR_SIZE}
                        className='text-black fill-black animate-pulse drop-shadow-lg'
                     />
                  </div>
               )
         )}
      </>
   )
}
