// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // 滚动淡入效果
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // 初始检查
    checkFade();
    
    // 滚动时检查
    window.addEventListener('scroll', checkFade);
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 设置iframe高度
    function setIframeHeight() {
        const iframes = document.querySelectorAll('.visualization-iframe');
        
        iframes.forEach(iframe => {
            // 为iframe设置默认高度，确保可见
            iframe.style.height = '500px';
            
            // 监听iframe加载完成事件
            iframe.addEventListener('load', function() {
                try {
                    // 尝试获取iframe内容高度
                    // 注意：这只在同源策略允许的情况下有效
                    const height = iframe.contentWindow.document.body.scrollHeight;
                    iframe.style.height = height + 'px';
                } catch (e) {
                    console.log('Cannot access iframe content due to same-origin policy');
                }
            });
        });
    }
    
    setIframeHeight();
    
    // 报告生成时间
    const reportTimeElement = document.getElementById('report-time');
    if (reportTimeElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        reportTimeElement.textContent = now.toLocaleDateString('zh-CN', options);
    }
});