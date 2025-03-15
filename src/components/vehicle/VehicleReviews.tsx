
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VehicleReview } from '@/types/vehicle';

interface VehicleReviewsProps {
  reviews: VehicleReview[];
  rating: number;
  reviewCount: number;
}

const VehicleReviews = ({ reviews, rating, reviewCount }: VehicleReviewsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 mr-2" />
        <span className="text-xl font-medium">{rating}</span>
        <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>
      </div>
      
      {reviews.map((review) => (
        <div key={review.id} className="border-t border-border pt-4">
          <div className="flex items-start">
            <img 
              src={review.userImage} 
              alt={review.user}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.user}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-4 w-4",
                        i < review.rating 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-muted-foreground"
                      )} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              <p className="mt-2">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleReviews;
