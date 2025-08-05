// 小六壬核心数据和计算逻辑
const liuRenData = {
    // 六神基本信息
    gods: [
        {
            name: "大安",
            element: "木",
            beast: "青龙",
            nature: "最大的吉利，有静止、心安、吉祥",
            position: "食指指根"
        },
        {
            name: "流连",
            element: "水",
            beast: "玄武",
            nature: "运气平平，凡事拖延，有暗昧不明、延迟、纠缠",
            position: "食指指尖"
        },
        {
            name: "速喜",
            element: "火",
            beast: "朱雀",
            nature: "喜事在眼前，上吉的好卦，有快速、喜庆、吉利",
            position: "中指指尖"
        },
        {
            name: "赤口",
            element: "金",
            beast: "白虎",
            nature: "争执，官讼，事态不和，有不吉、惊恐、凶险",
            position: "无名指指尖"
        },
        {
            name: "小吉",
            element: "木",
            beast: "六合",
            nature: "和合、吉利的事情发生，事情值得等待与坚持",
            position: "无名指指根"
        },
        {
            name: "空亡",
            element: "土",
            beast: "勾陈",
            nature: "落空，无结果，不利，有不吉、无结果、忧虑",
            position: "中指指根"
        }
    ],

    // 针对不同问题的详细解释
    interpretations: {
        问运势: {
            "大安": "目前运势不错，稳定成长，但不宜躁进。",
            "流连": "目前运势低迷，心情不开朗，凡事受阻。",
            "速喜": "目前运势渐开，马上积极行动即可如愿。",
            "赤口": "目前运势不明，若有大计划立刻实施勿拖延则可成功，若卜小事则不成。",
            "小吉": "目前运势不错，保持目前状况就会越来越好。",
            "空亡": "目前运势不佳，自身拿不定主意，无所适从，可多听取他人之意见。"
        },
        问财富: {
            "大安": "求财可得，但目前不宜扩张，只可守住旧业。",
            "流连": "求财得，破财之卦，且有被人影响破财的现象。",
            "速喜": "求财可得，但有先破后得或先得后破预兆，若得到钱财就必须赶快脱身。",
            "赤口": "大起大落，求财不易。",
            "小吉": "求财可得，而且有因人得财之兆。",
            "空亡": "求财难得，保守为要。"
        },
        问感情: {
            "大安": "女问好，感情顺遂，男问差，感情虽稳，但已无新鲜感，会出现点小问题。",
            "流连": "双方沟通不良、冷战、或一方太强势，感情不平衡。",
            "速喜": "感情刚开始为热恋，已相处感情则为口舌。",
            "赤口": "感情纷争多，或女方身体有疾病。",
            "小吉": "无感情，可因他人介绍而得，有感情，则恋情顺利。",
            "空亡": "双方争执多，且有因他人问题或者介入而争执之事。"
        },
        问事业: {
            "大安": "目前稳定可得上司赏识，但切勿锋芒太露。",
            "流连": "被上司盯或者被人扯后腿，小人之卦。",
            "速喜": "工作得利，但须注意文件上的疏失。",
            "赤口": "若为武职或者粗重行业则顺，若为文职则不顺。",
            "小吉": "工作不错，注意处理公司财务及与下属沟通之事。",
            "空亡": "工作失利，易被人陷害、因他人问题导致工作失利。"
        },
        问身体: {
            "大安": "无大病，但须注意因过度操劳而得病。",
            "流连": "肠胃不舒服或者精神压力太大所得的病。",
            "速喜": "一切病患皆为小疾，不严重。",
            "赤口": "胸口、支气管、血光之灾，赤口有代表流行病的含义。",
            "小吉": "肝胆之疾病和消化系统，但是问题不大。",
            "空亡": "脾胃、神经系统出问题，也有异病可能。"
        },
        问行人: {
            "大安": "人平安，但目前不愿与自身连络。",
            "流连": "人平安，但目前仍流连忘返。",
            "速喜": "人已经快到了。",
            "赤口": "所问之人目前有困难或者有事情纠缠。",
            "小吉": "人已经快到了。",
            "空亡": "人在途中遇到困难或灾厄而难到。"
        }
    }
};

// 小六壬计算核心类
class LiuRenCalculator {
    constructor() {
        this.gods = liuRenData.gods;
        this.interpretations = liuRenData.interpretations;
    }

    // 计算某个数字对应的神位
    calculatePosition(number, startIndex = 0) {
        const totalPositions = this.gods.length;
        const position = (startIndex + number - 1) % totalPositions;
        return position;
    }

    // 计算三个数字的完整结果
    calculateResults(numbers) {
        const results = [];
        let currentIndex = 0;

        for (let i = 0; i < numbers.length; i++) {
            const num = numbers[i];
            const position = this.calculatePosition(num, currentIndex);
            const god = this.gods[position];

            results.push({
                number: num,
                god: god,
                position: position,
                startIndex: currentIndex
            });

            currentIndex = position;
        }

        return results;
    }

    // 获取特定问题的解释
    getInterpretation(question, godName) {
        return this.interpretations[question][godName];
    }

    // 分析整体结果
    analyzeResults(results, question) {
        const godNames = results.map(r => r.god.name);
        const analysis = [];

        // 分析过程
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const interpretation = this.getInterpretation(question, result.god.name);

            analysis.push({
                step: i + 1,
                number: result.number,
                god: result.god,
                interpretation: interpretation
            });
        }

        // 整体分析
        const firstGod = godNames[0];
        const lastGod = godNames[godNames.length - 1];

        let overallAnalysis = "";
        if (lastGod === "大安" || lastGod === "速喜" || lastGod === "小吉") {
            overallAnalysis = "最终结果趋向吉利，事情发展会有好的结果。";
        } else if (lastGod === "流连" || lastGod === "赤口" || lastGod === "空亡") {
            overallAnalysis = "最终结果不太理想，过程可能会比较曲折，需要耐心等待时机。";
        }

        // 过程分析
        if (godNames.includes("空亡")) {
            overallAnalysis += " 过程中会有落空的情况，需要重新规划。";
        }
        if (godNames.includes("赤口")) {
            overallAnalysis += " 过程中可能会有争执或口舌是非。";
        }
        if (godNames.includes("速喜")) {
            overallAnalysis += " 过程中会有快速发展的机会。";
        }

        return {
            analysis: analysis,
            overallAnalysis: overallAnalysis,
            godSequence: godNames
        };
    }
}

// 全局变量
let selectedQuestion = null;
let calculator = new LiuRenCalculator();

// DOM元素变量
let questionBtns, numberInputs, calculateBtn, resultSection, resultProcess, resultDetails, diceBtn;

// 确保DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    questionBtns = document.querySelectorAll('.question-btn');
    numberInputs = document.querySelectorAll('.number-inputs input');
    calculateBtn = document.getElementById('calculateBtn');
    resultSection = document.getElementById('resultSection');
    resultProcess = document.getElementById('resultProcess');
    resultDetails = document.getElementById('resultDetails');
    diceBtn = document.getElementById('diceBtn');
    
    // 引导按钮
    const startDivinationBtn = document.getElementById('startDivinationBtn');

    // 事件监听器
    questionBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            // 移除其他按钮的选中状态
            questionBtns.forEach(b => b.classList.remove('selected'));
            // 添加当前按钮的选中状态
            this.classList.add('selected');

            selectedQuestion = this.dataset.question;
            checkCanCalculate();
        });
    });

    numberInputs.forEach(input => {
        input.addEventListener('input', checkCanCalculate);
    });

    calculateBtn.addEventListener('click', performCalculation);

    // 骰子按钮事件监听器
    if (diceBtn) {
        diceBtn.addEventListener('click', generateRandomNumbers);
    }
    
    // 引导按钮事件监听器
    if (startDivinationBtn) {
        startDivinationBtn.addEventListener('click', scrollToDivinationArea);
    }
});

// 切换描述显示/隐藏
function toggleDescription(button) {
    const fingerPosition = button.parentElement;
    const shortDesc = fingerPosition.querySelector('.position-desc-short');
    const fullDesc = fingerPosition.querySelector('.position-desc-full');
    const isExpanded = fullDesc.classList.contains('expanded');
    
    if (!isExpanded) {
        // 展开详细描述
        shortDesc.style.opacity = '0';
        fullDesc.classList.add('expanded');
        button.classList.add('expanded');
        button.innerHTML = '收起 <span class="btn-arrow">▼</span>';
    } else {
        // 收起详细描述
        shortDesc.style.opacity = '0.9';
        fullDesc.classList.remove('expanded');
        button.classList.remove('expanded');
        button.innerHTML = '详细 <span class="btn-arrow">▼</span>';
    }
}

// 滚动到算命操作区域
function scrollToDivinationArea() {
    const divinationContainer = document.querySelector('.divination-container');
    if (divinationContainer) {
        // 添加按钮点击动画效果
        const startBtn = document.getElementById('startDivinationBtn');
        if (startBtn) {
            startBtn.style.transform = 'translateY(-1px)';
            startBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
            
            setTimeout(() => {
                startBtn.style.transform = '';
                startBtn.style.boxShadow = '';
            }, 200);
        }
        
        // 平滑滚动到算命操作区域
        divinationContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
        
        // 滚动完成后添加一个轻微的高亮效果
        setTimeout(() => {
            divinationContainer.style.transform = 'scale(1.02)';
            divinationContainer.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                divinationContainer.style.transform = 'scale(1)';
                setTimeout(() => {
                    divinationContainer.style.transition = '';
                }, 300);
            }, 300);
        }, 800);
    }
}

// 生成随机数字
function generateRandomNumbers() {
    // 禁用按钮并添加动画效果
    diceBtn.disabled = true;
    diceBtn.classList.add('rolling');

    // 更新按钮文本
    const diceText = diceBtn.querySelector('.dice-text');
    const originalText = diceText.textContent;
    diceText.textContent = '生成中...';

    // 模拟滚动效果，逐个填入数字
    const inputs = Array.from(numberInputs);

    // 延迟一点时间让用户看到动画效果
    setTimeout(() => {
        inputs.forEach((input, index) => {
            setTimeout(() => {
                // 生成1-999之间的随机数
                const randomNumber = Math.floor(Math.random() * 999) + 1;

                // 添加数字变化动画效果
                input.style.transform = 'scale(1.1)';
                input.style.transition = 'transform 0.2s ease';

                // 设置数字
                input.value = randomNumber;

                // 触发input事件以更新计算按钮状态
                input.dispatchEvent(new Event('input'));

                // 恢复输入框大小
                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                }, 200);

                // 如果是最后一个输入框，恢复按钮状态
                if (index === inputs.length - 1) {
                    setTimeout(() => {
                        diceBtn.disabled = false;
                        diceBtn.classList.remove('rolling');
                        diceText.textContent = originalText;
                    }, 300);
                }
            }, index * 200); // 每个输入框间隔200ms
        });
    }, 300); // 初始延迟300ms
}

// 检查是否可以开始计算
function checkCanCalculate() {
    const allNumbersFilled = Array.from(numberInputs).every(input => input.value.trim() !== '');
    const questionSelected = selectedQuestion !== null;

    calculateBtn.disabled = !(allNumbersFilled && questionSelected);
}

// 执行计算
function performCalculation() {
    if (!selectedQuestion) {
        alert('请先选择您想问的问题！');
        return;
    }

    // 禁用计算按钮，防止重复点击
    calculateBtn.disabled = true;
    calculateBtn.classList.add('calculating');
    const calculateText = calculateBtn.querySelector('.calculate-text');
    const originalText = calculateText.textContent;
    calculateText.textContent = '算命中...';

    // 清空之前的结果
    const resultSection = document.getElementById('resultSection');
    resultSection.innerHTML = '';
    resultSection.style.display = 'none';

    // 显示全局Loading
    showGlobalLoading();

    const numbers = Array.from(numberInputs).map(input => {
        const value = parseInt(input.value);
        return isNaN(value) ? 1 : Math.max(1, Math.min(999, value));
    });

    const results = calculator.calculateResults(numbers);
    const analysis = calculator.analyzeResults(results, selectedQuestion);

    // 3秒后隐藏Loading并显示结果
    setTimeout(() => {
        hideGlobalLoading();
        displayFinalResults(results, analysis, selectedQuestion);

        // 重新启用计算按钮
        calculateBtn.disabled = false;
        calculateBtn.classList.remove('calculating');
        calculateText.textContent = originalText;

        // 滚动到结果区域
        setTimeout(() => {
            scrollToFinalResults();
        }, 300);
    }, 3000);
}







// 在计算过程底部显示最终结果 - 性能优化版本
function showFinalResultsAtBottom(analysis, question) {
    const resultSection = document.getElementById('resultSection');

    // 使用 DocumentFragment 减少 DOM 操作
    const fragment = document.createDocumentFragment();

    // 创建最终结果容器
    const finalResultsContainer = document.createElement('div');
    finalResultsContainer.className = 'final-results-container';
    finalResultsContainer.id = 'final-results'; // 添加ID用于滚动定位
    finalResultsContainer.style.cssText = `
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // 创建最终结果内容 - 使用模板字符串一次性创建
    const resultHTML = `
        <div class="final-results-header">
            <h2>🎯 算命结果</h2>
        </div>
        
        <div class="final-analysis-section">
            <div class="analysis-header">
                <h3>结果分析</h3>
                ${window.aiAnswerManager && window.aiAnswerManager.settingsManager.isConfigured() ?
            '<button class="ai-answer-btn-small" id="triggerAIAnswerSmall"><span class="ai-btn-icon-small">🤖</span><span class="ai-btn-text-small">AI解答</span></button>' :
            ''}
            </div>
            <div class="analysis-content">
                ${analysis.overallAnalysis}
            </div>
        </div>
        
        <div class="final-details-section">
            <h3>详细解释</h3>
            <div class="god-details">
                ${analysis.analysis.map((step, index) => `
                    <div class="god-detail">
                        <div class="god-header">
                            <span class="step-number">${index + 1}.</span>
                            <span class="god-name">${step.god.name}</span>
                            <span class="god-attributes">(${step.god.element} - ${step.god.beast})</span>
                            <span class="god-nature-inline">${step.god.nature}</span>
                        </div>
                        <div class="god-interpretation"><strong>针对您的问题：</strong>${step.interpretation}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    finalResultsContainer.innerHTML = resultHTML;
    fragment.appendChild(finalResultsContainer);

    // 一次性添加到 DOM
    resultSection.appendChild(fragment);

    // 添加小AI按钮的事件监听器（如果已配置）
    if (window.aiAnswerManager && window.aiAnswerManager.settingsManager.isConfigured()) {
        // 延迟绑定事件，确保DOM已渲染
        setTimeout(() => {
            const aiButtonSmall = document.getElementById('triggerAIAnswerSmall');
            if (aiButtonSmall) {
                aiButtonSmall.addEventListener('click', () => {
                    const aiResults = {
                        sequence: analysis.analysis.map(step => ({ god: step.god.name })),
                        analysis: analysis.overallAnalysis,
                        details: analysis.analysis.map(step => ({
                            god: step.god.name,
                            nature: step.god.nature,
                            interpretation: step.interpretation
                        }))
                    };
                    window.aiAnswerManager.showAIAnswerModal(question, aiResults);
                });
            }
        }, 100);
    }

    // 使用 requestAnimationFrame 优化动画
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            finalResultsContainer.style.opacity = '1';
            finalResultsContainer.style.transform = 'translateY(0)';
        });
    });

    // 优化滚动 - 使用 Intersection Observer 检测元素可见性
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素已经可见，不需要滚动
                observer.disconnect();
            } else {
                // 平滑滚动到结果区域
                setTimeout(() => {
                    finalResultsContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 400);
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(finalResultsContainer);
}

// 显示最终结果（保持原函数以备后用）
function showFinalResults(analysis, question) {
    const modalBody = document.getElementById('modalBody');

    // 清除步骤内容（保留最后一步）
    const stepCards = modalBody.querySelectorAll('.modal-tarot-card');
    stepCards.forEach((card, index) => {
        if (index < stepCards.length - 1) {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateX(-50px)';
            setTimeout(() => card.remove(), 500);
        }
    });

    // 清除完成提示
    const completingDivs = modalBody.querySelectorAll('div[style*="正在生成最终分析"]');
    completingDivs.forEach(div => div.remove());

    // 创建最终结果卡片
    setTimeout(() => {
        const finalHTML = `
            <!-- 神位序列卡片 -->
            <div class="modal-tarot-card">
                <div class="modal-card-icon">🎯</div>
                <h3>神位序列</h3>
                <div class="modal-card-content">
                    <div class="sequence-display" style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        ${analysis.godSequence.map((god, index) => `
                            <div class="sequence-item" style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; min-width: 80px; text-align: center; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.2);">
                                <div class="sequence-number" style="font-size: 0.9em; color: #FFD700; margin-bottom: 8px; font-weight: bold;">${index + 1}</div>
                                <div class="sequence-god" style="font-weight: bold; font-size: 1.1em; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${god}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- 总体分析卡片 -->
            <div class="modal-tarot-card">
                <div class="modal-card-icon">🌟</div>
                <h3>结果分析</h3>
                <div class="modal-card-content">
                    <div style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 20px; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.2);">
                        <p style="font-size: 1.1em; line-height: 1.8; text-shadow: 0 1px 2px rgba(0,0,0,0.3); margin: 0;">
                            ${analysis.overallAnalysis}
                        </p>
                    </div>
                </div>
            </div>

            <!-- 详细解释卡片 -->
            <div class="modal-tarot-card">
                <div class="modal-card-icon">📜</div>
                <h3>详细解释</h3>
                <div class="modal-card-content">
                    <div class="god-details" style="display: grid; gap: 15px;">
                        ${analysis.analysis.map(step => `
                            <div style="background: rgba(255,255,255,0.08); border-radius: 15px; padding: 20px; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.15);">
                                <h4 style="color: #FFD700; margin-bottom: 12px; font-size: 1.1em; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${step.god.name} (${step.god.element} - ${step.god.beast})</h4>
                                <p style="margin-bottom: 10px; line-height: 1.5; font-size: 0.95em;"><strong>基本含义：</strong>${step.god.nature}</p>
                                <p style="margin: 0; line-height: 1.5; font-size: 0.95em;"><strong>针对您的问题：</strong>${step.interpretation}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // 添加动画效果
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = finalHTML;
        const finalCards = tempDiv.querySelectorAll('.modal-tarot-card');

        finalCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            modalBody.appendChild(card);

            setTimeout(() => {
                card.style.transition = 'all 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 600);
}

// 手指动画功能
function startFingerAnimation(results) {
    // 创建手指动画容器
    const fingerAnimationContainer = document.createElement('div');
    fingerAnimationContainer.className = 'finger-animation';
    fingerAnimationContainer.innerHTML = `
        <div class="tarot-card finger-card">
            <div class="tarot-card-icon">🙌</div>
            <h3>手指掐算演示</h3>
            <div class="tarot-card-content">
                <div class="finger-visual">
                    <div class="hand">
                        <div class="finger thumb"></div>
                        <div class="finger index"></div>
                        <div class="finger middle"></div>
                        <div class="finger ring"></div>
                        <div class="finger pinky"></div>
                        <div class="palm"></div>
                    </div>
                    <div class="position-indicators">
                        ${createPositionIndicators()}
                    </div>
                </div>
                <div class="animation-controls">
                    <button id="playAnimation">🎬 播放动画</button>
                    <button id="resetAnimation">🔄 重置</button>
                </div>
            </div>
        </div>
    `;

    // 找到第一个tarot-card并插入在其后
    const firstCard = document.querySelector('.tarot-card');
    if (firstCard) {
        firstCard.parentNode.insertBefore(fingerAnimationContainer, firstCard.nextSibling);
    } else {
        resultSection.appendChild(fingerAnimationContainer);
    }

    // 添加动画控制事件
    const playBtn = document.getElementById('playAnimation');
    const resetBtn = document.getElementById('resetAnimation');

    playBtn.addEventListener('click', () => playFingerAnimation(results));
    resetBtn.addEventListener('click', resetFingerAnimation);

    // 自动播放动画
    setTimeout(() => playFingerAnimation(results), 1500);
}

// 创建位置指示器
function createPositionIndicators() {
    const positions = ['大安', '流连', '速喜', '赤口', '小吉', '空亡'];
    return positions.map((pos, index) => `
        <div class="position-indicator" data-position="${index}">
            <div class="indicator-name">${pos}</div>
            <div class="indicator-dot"></div>
        </div>
    `).join('');
}

// 播放手指动画
function playFingerAnimation(results) {
    const indicators = document.querySelectorAll('.position-indicator');
    const playBtn = document.getElementById('playAnimation');

    playBtn.disabled = true;
    playBtn.textContent = '播放中...';

    // 重置所有指示器
    indicators.forEach(indicator => {
        indicator.classList.remove('active', 'completed');
    });

    // 逐步显示每个步骤
    results.forEach((result, index) => {
        setTimeout(() => {
            // 激活当前位置
            const currentIndicator = indicators[result.position];
            currentIndicator.classList.add('active');

            // 显示步骤信息
            showStepInfo(result, index + 1);

            // 如果是最后一步，保持激活状态
            if (index === results.length - 1) {
                setTimeout(() => {
                    playBtn.disabled = false;
                    playBtn.textContent = '重新播放';
                }, 1000);
            } else {
                // 标记为完成并移除激活状态
                setTimeout(() => {
                    currentIndicator.classList.remove('active');
                    currentIndicator.classList.add('completed');
                }, 800);
            }
        }, index * 1200);
    });
}

// 重置手指动画
function resetFingerAnimation() {
    const indicators = document.querySelectorAll('.position-indicator');
    const playBtn = document.getElementById('playAnimation');
    const stepInfo = document.querySelector('.current-step-info');

    indicators.forEach(indicator => {
        indicator.classList.remove('active', 'completed');
    });

    if (stepInfo) {
        stepInfo.remove();
    }

    playBtn.disabled = false;
    playBtn.textContent = '播放动画';
}

// 显示步骤信息
function showStepInfo(result, stepNumber) {
    let stepInfo = document.querySelector('.current-step-info');

    if (!stepInfo) {
        stepInfo = document.createElement('div');
        stepInfo.className = 'current-step-info';
        document.querySelector('.finger-visual').appendChild(stepInfo);
    }

    stepInfo.innerHTML = `
        <div class="step-info-content">
            <div class="step-info-title">第${stepNumber}步</div>
            <div class="step-info-detail">
                数字 ${result.number} → ${result.god.name}
            </div>
        </div>
    `;

    // 添加淡入效果
    stepInfo.style.opacity = '0';
    stepInfo.style.transform = 'translateY(10px)';

    setTimeout(() => {
        stepInfo.style.transition = 'all 0.3s ease';
        stepInfo.style.opacity = '1';
        stepInfo.style.transform = 'translateY(0)';
    }, 50);
}

// 显示全局Loading
function showGlobalLoading() {
    // 创建Loading遮罩
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'globalLoading';
    loadingOverlay.className = 'global-loading-overlay';

    loadingOverlay.innerHTML = `
        <div class="global-loading-content">
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="loading-text">
                <h3>🔮 正在掐指推演</h3>
                <p>古老智慧，现代解读...</p>
            </div>
        </div>
    `;

    document.body.appendChild(loadingOverlay);

    // 添加动画效果
    requestAnimationFrame(() => {
        loadingOverlay.style.opacity = '1';
    });
}

// 隐藏全局Loading
function hideGlobalLoading() {
    const loadingOverlay = document.getElementById('globalLoading');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

// 直接显示最终结果（跳过计算过程）
function displayFinalResults(results, analysis, question) {
    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'block';

    // 直接显示最终结果
    showFinalResultsAtBottom(analysis, question);
}

// 优化后的平滑滚动函数 - 提升性能
function smoothScrollTo(element, duration = 600) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // 只向下滚动，添加阈值避免不必要的微小滚动
    if (Math.abs(distance) <= 10) {
        return;
    }

    // 使用 passive 事件监听器优化性能
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);

        // 使用 transform 而不是 scrollTo 以获得更好的性能
        window.scrollTo({
            top: run,
            behavior: 'auto'
        });

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // 使用三次贝塞尔曲线获得更自然的动画效果
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// 模态框关闭功能
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('resultModal');
    const closeBtn = document.getElementById('modalCloseBtn');

    // 关闭按钮点击事件
    closeBtn.addEventListener('click', closeModal);

    // 点击模态框背景关闭
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    console.log('掐指一算网站已加载完成');
});

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('resultModal');
    modal.style.display = 'none';

    // 恢复页面滚动
    const scrollY = modal.dataset.scrollY || 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    // 恢复滚动位置
    window.scrollTo(0, scrollY);

    // 清空模态框内容
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = '';
}


// 滚动到最终结果区域
function scrollToFinalResults() {
    const finalResults = document.getElementById('final-results');
    if (finalResults) {
        finalResults.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }
}

// 增强的平滑滚动函数 - 支持偏移量
function smoothScrollToElement(element, offset = 0, duration = 800) {
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // 如果距离很小，直接跳转
    if (Math.abs(distance) <= 10) {
        return;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);

        window.scrollTo({
            top: run,
            behavior: 'auto'
        });

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // 使用三次贝塞尔曲线获得更自然的动画效果
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}// 创建滚动指示器


// 设置面板功能
class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
        this.initEventListeners();
        this.loadSettingsToUI();
    }

    // 从localStorage加载设置
    loadSettings() {
        const defaultSettings = {
            baseUrl: '',
            apiKey: '',
            model: ''
        };

        try {
            const saved = localStorage.getItem('ai-settings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch (error) {
            console.error('加载设置失败:', error);
            return defaultSettings;
        }
    }

    // 保存设置到localStorage
    saveSettings() {
        try {
            localStorage.setItem('ai-settings', JSON.stringify(this.settings));
            return true;
        } catch (error) {
            console.error('保存设置失败:', error);
            return false;
        }
    }

    // 初始化事件监听器
    initEventListeners() {
        // 设置按钮点击事件
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                console.log('设置按钮被点击');
                this.showSettingsModal();
            });
        } else {
            console.error('找不到设置按钮元素');
        }

        // 关闭设置面板
        const settingsCloseBtn = document.getElementById('settingsCloseBtn');
        if (settingsCloseBtn) {
            settingsCloseBtn.addEventListener('click', () => {
                this.hideSettingsModal();
            });
        }

        // 点击模态框外部关闭
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target.id === 'settingsModal') {
                    this.hideSettingsModal();
                }
            });
        }

        // 模型输入框不需要特殊处理

        // 保存设置按钮
        const saveSettingsBtn = document.getElementById('saveSettings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveSettingsFromUI();
            });
        }

        // 测试连接按钮
        const testConnectionBtn = document.getElementById('testConnection');
        if (testConnectionBtn) {
            testConnectionBtn.addEventListener('click', () => {
                this.testConnection();
            });
        }
    }

    // 显示设置面板
    showSettingsModal() {
        document.getElementById('settingsModal').style.display = 'block';
        this.loadSettingsToUI();
    }

    // 隐藏设置面板
    hideSettingsModal() {
        document.getElementById('settingsModal').style.display = 'none';
    }

    // 将设置加载到UI
    loadSettingsToUI() {
        document.getElementById('baseUrl').value = this.settings.baseUrl || '';
        document.getElementById('apiKey').value = this.settings.apiKey || '';
        document.getElementById('model').value = this.settings.model || '';
    }

    // 从UI保存设置
    saveSettingsFromUI() {
        const baseUrl = document.getElementById('baseUrl').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const model = document.getElementById('model').value.trim();

        this.settings.baseUrl = baseUrl;
        this.settings.apiKey = apiKey;
        this.settings.model = model;

        if (this.saveSettings()) {
            this.showMessage('设置保存成功！', 'success');
        } else {
            this.showMessage('设置保存失败！', 'error');
        }
    }

    // 测试连接
    async testConnection() {
        // 获取当前UI中的值
        const baseUrl = document.getElementById('baseUrl').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        const model = document.getElementById('model').value.trim();

        if (!baseUrl || !apiKey || !model) {
            this.showMessage('请先填写 BASE URL、API KEY 和模型名称', 'error');
            return;
        }

        const testBtn = document.getElementById('testConnection');
        const originalText = testBtn.textContent;
        testBtn.textContent = '测试中...';
        testBtn.disabled = true;

        try {
            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'user', content: '测试连接' }],
                    max_tokens: 10
                })
            });

            if (response.ok) {
                this.showMessage('连接测试成功！', 'success');
            } else {
                const error = await response.text();
                this.showMessage(`连接测试失败: ${response.status} ${error}`, 'error');
            }
        } catch (error) {
            this.showMessage(`连接测试失败: ${error.message}`, 'error');
        } finally {
            testBtn.textContent = originalText;
            testBtn.disabled = false;
        }
    }

    // 显示消息
    showMessage(message, type = 'info') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `settings-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;

        if (type === 'success') {
            messageEl.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        } else if (type === 'error') {
            messageEl.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
        } else {
            messageEl.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
        }

        document.body.appendChild(messageEl);

        // 3秒后自动移除
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }

    // 检查是否已配置AI设置
    isConfigured() {
        return !!(this.settings.baseUrl && this.settings.apiKey && this.settings.model);
    }

    // 获取当前设置
    getSettings() {
        return { ...this.settings };
    }
}

// AI解答功能
class AIAnswerManager {
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }

    // 生成AI解答
    async generateAnswer(question, results) {
        const settings = this.settingsManager.getSettings();

        if (!this.settingsManager.isConfigured()) {
            return null;
        }

        const prompt = this.buildPrompt(question, results);

        try {
            const response = await fetch(`${settings.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${settings.apiKey}`
                },
                body: JSON.stringify({
                    model: settings.model,
                    messages: [
                        {
                            role: 'system',
                            content: '你是一位精通小六壬算命的大师，能够根据算命结果给出深入的解读和建议。请用温和、智慧的语调回答，既要尊重传统文化，也要给出实用的人生建议。'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || '抱歉，AI暂时无法生成解答。';
        } catch (error) {
            console.error('AI解答生成失败:', error);
            throw error;
        }
    }

    // 构建提示词
    buildPrompt(question, results) {
        const { sequence, analysis, details } = results;

        let prompt = `你是一位专业的小六壬算命师，请根据以下算命结果为用户提供准确的解读。

## 算命信息
**用户问题：** ${question}
**神位序列：** ${sequence.map((item, index) => `${index + 1}.${item.god}`).join(' → ')}
**系统分析：** ${analysis}

## 详细神位信息
${details.map((detail, index) => `**${index + 1}. ${detail.god}**
- 基本含义：${detail.nature}
- 针对问题：${detail.interpretation}`).join('\n\n')}

## 回答要求
请严格按照以下JSON格式回答，不要添加任何其他内容：

\`\`\`json
{
  "overall_fortune": "整体运势评价（吉/中/凶）",
  "current_situation": "对当前情况的分析（100-150字）",
  "development_trend": "未来发展趋势预测（100-150字）", 
  "practical_advice": [
    "具体建议1（30-50字）",
    "具体建议2（30-50字）",
    "具体建议3（30-50字）"
  ],
  "precautions": [
    "注意事项1（30-50字）",
    "注意事项2（30-50字）"
  ],
  "lucky_elements": {
    "time": "有利时间（如：上午、下午、晚上等）",
    "direction": "有利方位（如：东方、南方等）",
    "color": "有利颜色",
    "number": "有利数字"
  },
  "summary": "总结建议（80-120字）"
}
\`\`\`

**重要提醒：**
1. 必须严格按照上述JSON格式回答
2. 每个字段都必须填写，不能为空
3. 字数要求必须严格遵守
4. 语言要通俗易懂，贴近现代生活
5. 建议要具体可行，避免空泛的表述`;

        return prompt;
    }

    // 显示AI解答弹窗
    showAIAnswerModal(question, results) {
        if (!this.settingsManager.isConfigured()) {
            return;
        }

        // 创建弹窗遮罩
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'ai-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="ai-modal-card">
                <div class="ai-modal-header">
                    <div class="ai-modal-title">
                        <span class="ai-modal-icon">🤖</span>
                        <h2>AI 智能解答</h2>
                    </div>
                    <button class="ai-modal-close" aria-label="关闭">×</button>
                </div>
                <div class="ai-modal-body">
                    <div class="ai-loading">
                        <div class="ai-spinner"></div>
                        <span>AI 正在深度分析您的算命结果...</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        // 绑定关闭事件
        const closeBtn = modalOverlay.querySelector('.ai-modal-close');
        const overlay = modalOverlay;

        const closeModal = () => {
            modalOverlay.classList.add('closing');
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // 显示动画
        setTimeout(() => {
            modalOverlay.classList.add('show');
        }, 10);

        // 异步生成AI解答
        this.generateAnswer(question, results)
            .then(answer => {
                const formattedAnswer = this.formatAnswer(answer);
                const modalBody = modalOverlay.querySelector('.ai-modal-body');
                modalBody.innerHTML = `
                    <div class="ai-answer-content">${formattedAnswer}</div>
                `;
            })
            .catch(error => {
                console.error('AI解答生成失败:', error);
                // 显示测试内容
                const testAnswer = `## 🔮 运势分析

根据您的**小六壬**算命结果，我为您提供以下深度解读：

### 1. 当前情况分析
您的运势整体呈现*积极向上*的趋势，神位组合预示着：
- 内心平静，心态稳定
- 即将有喜事发生
- 适合做重要决定

### 2. 发展趋势
- 短期内会有**好消息**传来
- 人际关系和谐
- 事业发展顺利

### 3. 实用建议
- 保持现有的积极心态
- 抓住即将到来的机会
- 与他人合作会带来更好的结果

### 4. 趋吉避凶
- 避免过于急躁
- 多听取他人意见
- 保持谦逊的态度

*✨ 注：此解读仅供参考，具体情况还需结合实际生活进行判断。*`;

                const modalBody = modalOverlay.querySelector('.ai-modal-body');
                modalBody.innerHTML = `
                    <div class="ai-answer-content">${this.formatAnswer(testAnswer)}</div>
                `;
            });
    }

    // 格式化AI回答
    formatAnswer(answer) {
        if (!answer || typeof answer !== 'string') {
            return '暂无AI解答内容';
        }

        try {
            // 尝试解析JSON格式的回答
            let jsonData;

            // 提取JSON内容（处理可能包含```json```的情况）
            const jsonMatch = answer.match(/```json\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                jsonData = JSON.parse(jsonMatch[1]);
            } else {
                // 尝试直接解析整个回答
                jsonData = JSON.parse(answer);
            }

            // 验证必要字段
            const requiredFields = ['overall_fortune', 'current_situation', 'development_trend', 'practical_advice', 'precautions', 'lucky_elements', 'summary'];
            const missingFields = requiredFields.filter(field => !jsonData[field]);

            if (missingFields.length > 0) {
                throw new Error(`缺少必要字段: ${missingFields.join(', ')}`);
            }

            // 生成结构化HTML
            return this.generateStructuredHTML(jsonData);

        } catch (error) {
            console.warn('JSON解析失败，使用备用格式化方法:', error);

            // 备用方案：使用原有的markdown格式化
            return this.formatMarkdown(answer);
        }
    }

    // 生成结构化HTML
    generateStructuredHTML(data) {
        const fortuneIcon = data.overall_fortune === '吉' ? '🟢' :
            data.overall_fortune === '中' ? '🟡' : '🔴';

        return `
            <div class="ai-structured-answer">
                <!-- 整体运势 -->
                <div class="ai-section ai-fortune">
                    <div class="ai-section-header">
                        <span class="ai-icon">${fortuneIcon}</span>
                        <h3>整体运势</h3>
                        <span class="fortune-badge fortune-${data.overall_fortune}">${data.overall_fortune}</span>
                    </div>
                </div>

                <!-- 当前情况分析 -->
                <div class="ai-section">
                    <div class="ai-section-header">
                        <span class="ai-icon">🔍</span>
                        <h3>当前情况分析</h3>
                    </div>
                    <div class="ai-content">
                        <p>${data.current_situation}</p>
                    </div>
                </div>

                <!-- 发展趋势 -->
                <div class="ai-section">
                    <div class="ai-section-header">
                        <span class="ai-icon">📈</span>
                        <h3>发展趋势</h3>
                    </div>
                    <div class="ai-content">
                        <p>${data.development_trend}</p>
                    </div>
                </div>

                <!-- 实用建议 -->
                <div class="ai-section">
                    <div class="ai-section-header">
                        <span class="ai-icon">💡</span>
                        <h3>实用建议</h3>
                    </div>
                    <div class="ai-content">
                        <ul class="ai-advice-list">
                            ${data.practical_advice.map(advice => `<li>${advice}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- 注意事项 -->
                <div class="ai-section">
                    <div class="ai-section-header">
                        <span class="ai-icon">⚠️</span>
                        <h3>注意事项</h3>
                    </div>
                    <div class="ai-content">
                        <ul class="ai-precaution-list">
                            ${data.precautions.map(precaution => `<li>${precaution}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- 有利元素 -->
                <div class="ai-section">
                    <div class="ai-section-header">
                        <span class="ai-icon">🍀</span>
                        <h3>有利元素</h3>
                    </div>
                    <div class="ai-content">
                        <div class="lucky-elements-grid">
                            <div class="lucky-item">
                                <span class="lucky-label">⏰ 有利时间</span>
                                <span class="lucky-value">${data.lucky_elements.time}</span>
                            </div>
                            <div class="lucky-item">
                                <span class="lucky-label">🧭 有利方位</span>
                                <span class="lucky-value">${data.lucky_elements.direction}</span>
                            </div>
                            <div class="lucky-item">
                                <span class="lucky-label">🎨 有利颜色</span>
                                <span class="lucky-value">${data.lucky_elements.color}</span>
                            </div>
                            <div class="lucky-item">
                                <span class="lucky-label">🔢 有利数字</span>
                                <span class="lucky-value">${data.lucky_elements.number}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 总结建议 -->
                <div class="ai-section ai-summary">
                    <div class="ai-section-header">
                        <span class="ai-icon">📝</span>
                        <h3>总结建议</h3>
                    </div>
                    <div class="ai-content">
                        <div class="summary-box">
                            <p>${data.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 备用的Markdown格式化方法
    formatMarkdown(answer) {
        let formatted = answer
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h4>$1</h4>')
            .replace(/^## (.*$)/gm, '<h3>$1</h3>')
            .replace(/^# (.*$)/gm, '<h2>$1</h2>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
            .replace(/\n/g, '<br>');

        formatted = formatted.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
        return formatted;
    }
}

// 初始化设置管理器和AI解答管理器
document.addEventListener('DOMContentLoaded', function () {
    // 创建设置管理器实例
    window.settingsManager = new SettingsManager();

    // 创建AI解答管理器实例
    window.aiAnswerManager = new AIAnswerManager(window.settingsManager);

    // 添加CSS动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
});