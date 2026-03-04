const DashboardCard = () => {
  return (
    <div className="dash-frame">
      <div className="dash-card">
        <div className="dash-chrome">
          <span className="dc r" />
          <span className="dc a" />
          <span className="dc g" />
          <span className="dash-chrome-label">CompliancePilot — Overview</span>
        </div>

        <div className="resource-row">
          <span className="res-label"><span className="dot dot-g" />Resource: A</span>
          <span className="res-sep">|</span>
          <span className="res-label"><span className="dot dot-b" />Resource: B</span>
          <span className="res-sep">|</span>
          <span className="res-label"><span className="dot dot-r" />Resource: C</span>
        </div>

        <div className="dash-metrics">
          <div className="dm">
            <div className="dm-label">Audit Findings</div>
            <div className="dm-value v-blue">34</div>
            <div className="dm-sub s-red">5 Critical</div>
          </div>
          <div className="dm">
            <div className="dm-label">Threats Detected</div>
            <div className="dm-value v-white">12</div>
            <div className="dm-sub s-amber">2 High</div>
          </div>
          <div className="dm">
            <div className="dm-label">Compliance Score</div>
            <div className="score-wrap">
              <div className="score-ring"><span>92</span></div>
              <div className="score-tag">EXCELLENT</div>
            </div>
          </div>
        </div>

        <div className="dash-chart-wrap">
          <div className="dash-chart-title">Audit Overview</div>
          <div className="dash-chart">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bar" />
            ))}
          </div>
        </div>

        <div className="dash-threats-title">Open Threats</div>
        <div className="threat">
          <div className="ti warn">⚠️</div>
          <div className="t-info">
            <div className="tn">Data Exposure Risk</div>
            <div className="td">Risk resource Risk 2</div>
          </div>
          <span className="tbadge m">Medium</span>
        </div>
        <div className="threat">
          <div className="ti danger">🔒</div>
          <div className="t-info">
            <div className="tn">Unauthorized Access</div>
            <div className="td">Risk resource Access 3</div>
          </div>
          <span className="tbadge h">High</span>
        </div>
        <div className="threat">
          <div className="ti info">🦠</div>
          <div className="t-info">
            <div className="tn">Malware Activity</div>
            <div className="td">Risk resource Risk 1</div>
          </div>
          <span className="tbadge l">Low</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
