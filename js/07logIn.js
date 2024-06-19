document.addEventListener("DOMContentLoaded", function() {
    // Simuliere eine Ladeverzögerung
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Entferne den Preloader nach der Animation
        setTimeout(function() {
            document.getElementById('preloader').style.display = 'none';
        }, 1000); // 1 Sekunde Verzögerung, um die CSS-Animation zu beenden
    },);
});

window.onload = function() {
    var checkbox = document.getElementById('meineCheckbox');
    checkbox.checked = true;
}