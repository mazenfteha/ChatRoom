import React from 'react'

function Room({name}) {
    return (
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <p>{name}</p>
                    </div>
                </div>
            </div>
    )
}

export default Room