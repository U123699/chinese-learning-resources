const resourcesData = [
    {
        id: 1,
        title: "HSK标准教程1 | HSK Standard Course 1",
        author: "姜丽萍 | Jiang Liping",
        level: "hsk1",
        type: "textbook",
        description: "HSK一级标准教材，适合零起点学习者 | HSK Level 1 standard textbook for complete beginners",
        fileSize: "13 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk1/hsk1.textbook.pdf",
        githubUrl: "https://github.com/U123699/chinese-learning-resources/blob/main/hsk1/hsk1.textbook.pdf"
    },
    {
        id: 2,
        title: "HSK1练习册 | HSK 1 Workbook",
        author: "姜丽萍 | Jiang Liping",
        level: "hsk1",
        type: "workbook",
        description: "HSK一级练习册 | HSK Level 1 workbook",
        fileSize: "23 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk1/hsk1.workbook.pdf",
        githubUrl: "https://github.com/U123699/chinese-learning-resources/blob/main/hsk1/hsk1.workbook.pdf"
    },
    {
        id: 3,
        title: "HSK标准教程2 | HSK Standard Course 2",
        author: "姜丽萍 | Jiang Liping",
        level: "hsk2",
        type: "textbook",
        description: "HSK二级标准教材 | HSK Level 2 standard textbook",
        fileSize: "13 MB",
        fileType: "PDF",
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk2/hsk2.textbook.pdf",
        githubUrl: "https://github.com/U123699/chinese-learning-resources/blob/main/hsk2/hsk2.textbook.pdf"
    },
    {        
        id: 4,        
        title: "中文分级阅读一级1 | Chinese characters reading pictures books level 1",        
        author: "积小步母语阅读馆",        
        level: "level1",
        type: "picturebook",        
        description: "chinese characters graded reading picture book level 1",        
        fileSize: "2.74 MB",        
        fileType: "PDF",        
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk1/1.compressed.pdf",        
        githubUrl: "https://github.com/U123699/chinese-learning-resources/blob/main/hsk1/1.compressed.pdf"    
    },
    {                
        id: 5,                
        title: "新HSK4考试辅导教程 | New HSK4 Exam Preparation Guide",                
        author: "陈香 | Chen Xiang",                
        level: "hsk4",
        type: "exam", 
        description: "For HSK4 exam preparation",                
        fileSize: "23.88 MB",                
        fileType: "PDF",                
        downloadUrl: "https://raw.githubusercontent.com/U123699/chinese-learning-resources/main/hsk4/NewHSK4ExamPreparationGuide.pdf",               
        githubUrl: "https://github.com/U123699/chinese-learning-resources/blob/main/hsk4/NewHSK4ExamPreparationGuide.pdf"    
    }
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
    // 初始化类型筛选器选项 | Initialize type filter options
    populateTypeFilter();
    
    // 渲染资源 | Render resources
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

// 填充类型筛选器选项 | Populate type filter options
function populateTypeFilter() {
    // 获取所有唯一的类型 | Get all unique types
    const allTypes = [...new Set(resourcesData.map(resource => resource.type))];
    
    // 清空现有选项（除了"所有类型"）| Clear existing options (except "All Types")
    while (typeFilter.options.length > 1) {
        typeFilter.remove(1);
    }
    
    // 添加类型选项 | Add type options
    allTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = getTypeText(type);
        typeFilter.appendChild(option);
    });
}

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
    
    // 显示结果数量 | Show result count
    updateResultCount(filtered.length);
}

// 更新结果数量显示 | Update result count display
function updateResultCount(count) {
    const resultCountElement = document.getElementById('resultCount');
    if (resultCountElement) {
        resultCountElement.textContent = `找到 ${count} 个资源 | Found ${count} resources`;
    }
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
                <a href="${resource.githubUrl}" class="github-link" target="_blank" title="在GitHub上查看">
                    <i class="fab fa-github"></i>
                </a>
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
        'hsk6': 'HSK 6级 | Level 6',
        'level1': '初级 | Beginner Level'
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
        'exam': '模拟试题 | Practice Test',
        'picturebook': '绘本 | Picture Book',
        'guide': '考试指南 | Exam Guide'
    };
    return typeMap[type] || type;
}

// 从GitHub API动态加载资源数据（可选功能）
// Load resource data dynamically from GitHub API (optional feature)
async function loadResourcesFromGitHub() {
    try {
        loadingElement.style.display = 'block';
        
        // GitHub API URL - 需要一个 resources.json 文件在仓库中
        const apiUrl = 'https://api.github.com/repos/U123699/chinese-learning-resources/contents/resources.json';
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 解码base64内容
        const content = JSON.parse(atob(data.content));
        
        // 更新资源数据
        resourcesData.length = 0;
        resourcesData.push(...content);
        
        // 重新填充类型筛选器
        populateTypeFilter();
        
        // 重新渲染资源
        renderResources(resourcesData);
        
    } catch (error) {
        console.error('Failed to load resources from GitHub:', error);
        // 如果API失败，使用本地数据
        renderResources(resourcesData);
    } finally {
        loadingElement.style.display = 'none';
    }
}

// 检查URL参数，应用初始过滤（可选功能）
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = urlParams.get('level');
    const typeParam = urlParams.get('type');
    const searchParam = urlParams.get('search');
    
    if (levelParam) {
        currentFilter.level = levelParam;
        // 激活对应的导航链接
        const navLink = document.querySelector(`nav a[data-level="${levelParam}"]`);
        if (navLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    }
    
    if (typeParam) {
        currentFilter.type = typeParam;
        typeFilter.value = typeParam;
    }
    
    if (searchParam) {
        currentFilter.search = searchParam.toLowerCase();
        searchInput.value = searchParam;
    }
    
    if (levelParam || typeParam || searchParam) {
        applyFilters();
    }
}

// 在DOM加载后检查URL参数
document.addEventListener('DOMContentLoaded', function() {
    checkUrlParams();
});

// 导出数据到CSV（可选功能）
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // CSV头部
    const headers = ["ID", "Title", "Author", "Level", "Type", "Description", "FileSize", "FileType", "DownloadURL"];
    csvContent += headers.join(",") + "\n";
    
    // CSV数据行
    resourcesData.forEach(resource => {
        const row = [
            resource.id,
            `"${resource.title}"`,
            `"${resource.author}"`,
            resource.level,
            resource.type,
            `"${resource.description}"`,
            resource.fileSize,
            resource.fileType,
            resource.downloadUrl
        ];
        csvContent += row.join(",") + "\n";
    });
    
    // 创建下载链接
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chinese_learning_resources.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}







