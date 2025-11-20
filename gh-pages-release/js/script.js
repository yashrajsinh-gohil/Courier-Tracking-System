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

n