// 模拟数据 - 实际应用中从GitHub仓库或API获取
const resourcesData = [
    {
        id: 1,
        title: "HSK标准教程1",
        author: "姜丽萍",
        level: "hsk1",
        type: "textbook",
        description: "HSK一级标准教材，适合零起点学习者",
        fileSize: "25.4 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk1/textbook.pdf.pdf",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk1/textbook.pdf.pdf"
    },
    {
        id: 2,
        title: "HSK1练习册",
        author: "姜丽萍",
        level: "hsk1",
        type: "workbook",
        description: "配合标准教程的练习册",
        fileSize: "18.7 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/yourusername/chinese-learning-resources/main/hsk1/workbook.pdf",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk1/workbook.pdf"
    },
    {
        id: 3,
        title: "HSK2标准教程",
        author: "姜丽萍",
        level: "hsk2",
        type: "textbook",
        description: "HSK二级标准教材",
        fileSize: "32.1 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/yourusername/chinese-learning-resources/main/hsk2/textbook.pdf",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk2/textbook.pdf"
    },
    {
        id: 4,
        title: "HSK3听力音频",
        author: "汉办",
        level: "hsk3",
        type: "audio",
        description: "HSK三级听力部分音频材料",
        fileSize: "45.3 MB",
        fileType: "MP3",
        downloadUrl: "https://raw.githubusercontent.com/yourusername/chinese-learning-resources/main/hsk3/audio.zip",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk3/audio.zip"
    },
    {
        id: 5,
        title: "HSK4模拟试题",
        author: "汉办",
        level: "hsk4",
        type: "exam",
        description: "HSK四级全真模拟试题",
        fileSize: "12.8 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/yourusername/chinese-learning-resources/main/hsk4/mock-exam.pdf",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk4/mock-exam.pdf"
    },
    {
        id: 6,
        title: "HSK5高级教程",
        author: "刘珣",
        level: "hsk5",
        type: "textbook",
        description: "HSK五级高级汉语教程",
        fileSize: "38.9 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/yourusername/chinese-learning-resources/main/hsk5/advanced-textbook.pdf",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk5/advanced-textbook.pdf"
    },
    {
        id: 7,
        title: "HSK6大师级阅读",
        author: "王还",
        level: "hsk6",
        type: "textbook",
        description: "HSK六级高级阅读材料",
        fileSize: "41.2 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/yourusername/chinese-learning-resources/main/hsk6/reading.pdf",
        githubUrl: "https://github.com/yourusername/chinese-learning-resources/blob/main/hsk6/reading.pdf"
    }
];

// DOM元素
const resourcesGrid = document.getElementById('resourcesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const typeFilter = document.getElementById('typeFilter');
const navLinks = document.querySelectorAll('nav a');
const loadingElement = document.getElementById('loading');

// 当前过滤条件
let currentFilter = {
    level: 'all',
    type: 'all',
    search: ''
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    renderResources(resourcesData);
    
    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 更新级别过滤
            currentFilter.level = this.dataset.level;
            applyFilters();
        });
    });
    
    // 搜索事件
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 类型过滤事件
    typeFilter.addEventListener('change', function() {
        currentFilter.type = this.value;
        applyFilters();
    });
});

// 执行搜索
function performSearch() {
    currentFilter.search = searchInput.value.toLowerCase();
    applyFilters();
}

// 应用所有过滤条件
function applyFilters() {
    let filtered = resourcesData;
    
    // 按级别过滤
    if (currentFilter.level !== 'all') {
        filtered = filtered.filter(resource => resource.level === currentFilter.level);
    }
    
    // 按类型过滤
    if (currentFilter.type !== 'all') {
        filtered = filtered.filter(resource => resource.type === currentFilter.type);
    }
    
    // 按搜索词过滤
    if (currentFilter.search) {
        filtered = filtered.filter(resource => 
            resource.title.toLowerCase().includes(currentFilter.search) ||
            resource.author.toLowerCase().includes(currentFilter.search) ||
            resource.description.toLowerCase().includes(currentFilter.search)
        );
    }
    
    renderResources(filtered);
}

// 渲染资源卡片
function renderResources(resources) {
    if (resources.length === 0) {
        resourcesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #7f8c8d;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>未找到相关资源</h3>
                <p>请尝试其他搜索条件</p>
            </div>
        `;
        return;
    }
    
    resourcesGrid.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <div class="card-header">
                <span class="level-badge ${resource.level}">${resource.level.toUpperCase()}</span>
                <h3>${resource.title}</h3>
                <p class="type">${getTypeText(resource.type)} · ${resource.author}</p>
            </div>
            <div class="card-body">
                <p>${resource.description}</p>
            </div>
            <div class="card-footer">
                <a href="${resource.downloadUrl}" class="download-btn" target="_blank" download>
                    <i class="fas fa-download"></i> 下载
                </a>
                <div class="file-info">
                    ${resource.fileSize} · ${resource.fileType}
                </div>
            </div>
        </div>
    `).join('');
}

// 获取类型文本
function getTypeText(type) {
    const typeMap = {
        'textbook': '教材',
        'workbook': '练习册',
        'audio': '音频',
        'video': '视频',
        'exam': '模拟试题'
    };
    return typeMap[type] || type;
}

// 实际部署时，从GitHub API获取资源数据
async function loadResourcesFromGitHub() {
    // 这里可以添加从GitHub API获取数据的代码
    // 例如：https://api.github.com/repos/yourusername/chinese-learning-resources/contents/
    // 需要一个 resources.json 文件来存储资源信息

}

