// 真实数据 - 从你的GitHub仓库获取
// Real data - from your GitHub repository
const resourcesData = [
    {
        id: 1,
        title: "HSK标准教程1 | HSK Standard Course 1",
        author: "姜丽萍 | Jiang Liping",
        level: "hsk1",
        type: "textbook",
        description: "HSK一级标准教材，适合零起点学习者 | HSK Level 1 standard textbook for complete beginners",
        fileSize: "25.4 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk1/hsk1-textbook.pdf",
        githubUrl: "https://github.com/U123699/chinese-learning-resources/blob/main/hsk1/hsk1-textbook.pdf"
    }
    // 当你上传更多文件后，在这里按照格式添加
    // When you upload more files, add them here in the same format
    // 注意：id 数字要递增，不要重复
    // Note: id numbers should increase and not repeat
];

// DOM元素 | DOM Elements
const resourcesGrid = document.getElementById('resourcesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const typeFilter = document.getElementById('typeFilter');
const navLinks = document.querySelectorAll('nav a');
const loadingElement = document.getElementById('loading');

// 当前过滤条件 | Current filter conditions
let currentFilter = {
    level: 'all',
    type: 'all',
    search: ''
};

// 初始化页面 | Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderResources(resourcesData);
    
    // 导航点击事件 | Navigation click event
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新活动状态 | Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 更新级别过滤 | Update level filter
            currentFilter.level = this.dataset.level;
            applyFilters();
        });
    });
    
    // 搜索事件 | Search event
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 类型过滤事件 | Type filter event
    typeFilter.addEventListener('change', function() {
        currentFilter.type = this.value;
        applyFilters();
    });
});

// 执行搜索 | Perform search
function performSearch() {
    currentFilter.search = searchInput.value.toLowerCase();
    applyFilters();
}

// 应用所有过滤条件 | Apply all filters
function applyFilters() {
    let filtered = resourcesData;
    
    // 按级别过滤 | Filter by level
    if (currentFilter.level !== 'all') {
        filtered = filtered.filter(resource => resource.level === currentFilter.level);
    }
    
    // 按类型过滤 | Filter by type
    if (currentFilter.type !== 'all') {
        filtered = filtered.filter(resource => resource.type === currentFilter.type);
    }
    
    // 按搜索词过滤 | Filter by search term
    if (currentFilter.search) {
        filtered = filtered.filter(resource => 
            resource.title.toLowerCase().includes(currentFilter.search) ||
            resource.author.toLowerCase().includes(currentFilter.search) ||
            resource.description.toLowerCase().includes(currentFilter.search)
        );
    }
    
    renderResources(filtered);
}

// 渲染资源卡片 | Render resource cards
function renderResources(resources) {
    if (resources.length === 0) {
        resourcesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #7f8c8d;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>未找到相关资源 | No resources found</h3>
                <p>请尝试其他搜索条件 | Please try other search criteria</p>
            </div>
        `;
        return;
    }
    
    resourcesGrid.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <div class="card-header">
                <span class="level-badge ${resource.level}">${getLevelText(resource.level)}</span>
                <h3>${resource.title}</h3>
                <p class="type">${getTypeText(resource.type)} · ${resource.author}</p>
            </div>
            <div class="card-body">
                <p>${resource.description}</p>
            </div>
            <div class="card-footer">
                <a href="${resource.downloadUrl}" class="download-btn" target="_blank" download>
                    <i class="fas fa-download"></i> 下载 | Download
                </a>
                <div class="file-info">
                    ${resource.fileSize} · ${resource.fileType}
                </div>
            </div>
        </div>
    `).join('');
}

// 获取级别文本（中英双语）| Get level text (bilingual)
function getLevelText(level) {
    const levelMap = {
        'hsk1': 'HSK 1级 | Level 1',
        'hsk2': 'HSK 2级 | Level 2',
        'hsk3': 'HSK 3级 | Level 3',
        'hsk4': 'HSK 4级 | Level 4',
        'hsk5': 'HSK 5级 | Level 5',
        'hsk6': 'HSK 6级 | Level 6'
    };
    return levelMap[level] || level;
}

// 获取类型文本（中英双语）| Get type text (bilingual)
function getTypeText(type) {
    const typeMap = {
        'textbook': '教材 | Textbook',
        'workbook': '练习册 | Workbook',
        'audio': '音频 | Audio',
        'video': '视频 | Video',
        'exam': '模拟试题 | Practice Test'
    };
    return typeMap[type] || type;
}

// 实际部署时，从GitHub API获取资源数据
// In actual deployment, get resource data from GitHub API
async function loadResourcesFromGitHub() {
    // 这里可以添加从GitHub API获取数据的代码
    // Here you can add code to get data from GitHub API
    // 例如：https://api.github.com/repos/yourusername/chinese-learning-resources/contents/
    // 需要一个 resources.json 文件来存储资源信息
    // Need a resources.json file to store resource information
}
