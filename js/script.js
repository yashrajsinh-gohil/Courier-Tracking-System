// Externalized JavaScript for Homepage.html
// Moved from inline <script> in Homepage.html

// Quick demo tracking functions (client-side demo)
function quickTrack(){
    const val = document.getElementById('quickTrackInput').value.trim();
    if(!val){ alert('Please enter a tracking number.'); return; }
    showTrackingResult(val);
    // scroll to tracking section for visibility
    document.getElementById('tracking').scrollIntoView({ behavior: 'smooth' });
}

function advancedTrack(){
    const val = document.getElementById('advancedTrackInput').value.trim();
    if(!val){ alert('Please enter a tracking number.'); return; }
    showTrackingResult(val);
}

function showTrackingResult(trackingId){
    const resultsDiv = document.getElementById('trackingResults');
    const trackingIdSpan = document.getElementById('trackingId');
    if(resultsDiv && trackingIdSpan){
        trackingIdSpan.textContent = trackingId;
        resultsDiv.style.display = 'block';
    }
}

// Contact form handler
document.addEventListener('DOMContentLoaded', function(){
    const contactForm = document.getElementById('contactForm');
    if(contactForm){
        contactForm.addEventListener('submit', function(e){
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            // Show success message
            const successDiv = document.getElementById('contactSuccess');
            if(successDiv){
                successDiv.style.display = 'block';
                
                // Create mailto link
                const mailtoLink = `mailto:CourierTrackingSystem@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}`;
                window.location.href = mailtoLink;
                
                // Hide success message after 5 seconds
                setTimeout(function(){
                    successDiv.style.display = 'none';
                    contactForm.reset();
                }, 5000);
            }
        });
    }
});
