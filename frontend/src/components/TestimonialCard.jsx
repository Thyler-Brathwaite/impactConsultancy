import React from 'react'

export default function TestimonialCard({props}) {

function StarRating(rating) {
  return (
    
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? '⭐' : '☆'}</span>
      ))}
    </span>
  );
}
  return (
    <div className='testimonial-card'>
        <div className='testimonial-card-container'>
            <p>{props.testimony}</p>
            {StarRating(props.rating)}
            <p>{props.name}</p>
            <p>{props.role} {props.business}</p>
        </div>
    </div>
  )
}
