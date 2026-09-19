import React, { useState } from 'react';

const PRESET_ENDPOINTS = [
  { name: 'Root Welcome', method: 'GET', url: 'http://localhost:3000/' },
  { name: 'Message Dropbox', method: 'GET', url: 'http://localhost:3000/msg' },
  { name: 'System Info', method: 'GET', url: 'http://localhost:3000/sys' },
  { name: 'Get All Users', method: 'GET', url: 'http://localhost:3000/user' },
  { name: 'Get User by ID', method: 'GET', url: 'http://localhost:3000/user/1' },
  { 
    name: 'Create User', 
    method: 'POST', 
    url: 'http://localhost:3000/create',
    body: JSON.stringify({ name: "Rahul Sharma", email: "rahul@gmail.com" }, null, 2)
  },
  { 
    name: 'Update User', 
    method: 'PUT', 
    url: 'http://localhost:3000/user/1',
    body: JSON.stringify({ name: "Akshat V Sharma", email: "avs_updated@gmail.com" }, null, 2)
  },
  { name: 'Delete User', method: 'DELETE', url: 'http://localhost:3000/user/4' },
  { name: 'Get Registered Data', method: 'GET', url: 'http://localhost:3000/registered' },
  { 
    name: 'Register User', 
    method: 'POST', 
    url: 'http://localhost:3000/registered',
    body: JSON.stringify({ id: 5, name: "Rohit", email: "rohit@gmail.com" }, null, 2)
  },
  { 
    name: 'Login User', 
    method: 'POST', 
    url: 'http://localhost:3000/login',
    body: JSON.stringify({ email: "avs@gmail.com", password: "password123" }, null, 2)
  },
];

export default function ApiTester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://localhost:3000/user');
  const [activeTab, setActiveTab] = useState('params'); // 'params' | 'headers' | 'body'
  const [queryParams, setQueryParams] = useState([{ key: '', value: '', description: '' }]);
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json', description: '' }]);
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  
  // Response state
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseTab, setResponseTab] = useState('body'); // 'body' | 'headers'

  const handlePresetSelect = (preset) => {
    setMethod(preset.method);
    setUrl(preset.url);
    if (preset.body) {
      setRequestBody(preset.body);
      setActiveTab('body');
    }
  };

  const handleParamChange = (index, field, val) => {
    const updated = [...queryParams];
    updated[index][field] = val;
    setQueryParams(updated);
  };

  const addParamRow = () => {
    setQueryParams([...queryParams, { key: '', value: '', description: '' }]);
  };

  const removeParamRow = (index) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index, field, val) => {
    const updated = [...headers];
    updated[index][field] = val;
    setHeaders(updated);
  };

  const addHeaderRow = () => {
    setHeaders([...headers, { key: '', value: '', description: '' }]);
  };

  const removeHeaderRow = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse(null);
    const startTime = performance.now();

    try {
      // Build final URL with query params
      let finalUrl = url;
      const validParams = queryParams.filter(p => p.key.trim() !== '');
      if (validParams.length > 0) {
        const searchParams = new URLSearchParams();
        validParams.forEach(p => searchParams.append(p.key, p.value));
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + searchParams.toString();
      }

      // Build Headers object
      const reqHeaders = {};
      headers.forEach(h => {
        if (h.key.trim() !== '') {
          reqHeaders[h.key] = h.value;
        }
      });

      const options = {
        method: method,
        headers: reqHeaders,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = requestBody;
      }

      const res = await fetch(finalUrl, options);
      const endTime = performance.now();
      const timeMs = Math.round(endTime - startTime);

      const resHeadersObj = {};
      res.headers.forEach((val, key) => {
        resHeadersObj[key] = val;
      });

      let resData;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        resData = await res.json();
      } else {
        resData = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: timeMs,
        size: JSON.stringify(resData).length,
        headers: resHeadersObj,
        data: resData
      });
    } catch (err) {
      const endTime = performance.now();
      setResponse({
        status: 0,
        statusText: 'Error',
        time: Math.round(endTime - startTime),
        size: 0,
        headers: {},
        data: { error: 'Failed to fetch', details: err.message }
      });
    } finally {
      setLoading(false);
    }
  };

  const getMethodBadgeColor = (m) => {
    switch (m) {
      case 'GET': return '#0cbb52';
      case 'POST': return '#ffb400';
      case 'PUT': return '#097bed';
      case 'DELETE': return '#eb2013';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return '#0cbb52';
    if (status >= 400 && status < 500) return '#eab308';
    if (status >= 500) return '#ef4444';
    return '#ef4444';
  };

  return (
    <div style={styles.container}>
      {/* Left Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={{ fontWeight: 600, fontSize: '15px' }}>POSTMAN CLONE</span>
        </div>

        <div style={styles.sectionTitle}>COLLECTIONS / PRESETS</div>
        <div style={styles.presetList}>
          {PRESET_ENDPOINTS.map((item, idx) => (
            <div 
              key={idx} 
              style={styles.presetItem}
              onClick={() => handlePresetSelect(item)}
              title={item.url}
            >
              <span style={{ ...styles.methodBadge, color: getMethodBadgeColor(item.method) }}>
                {item.method}
              </span>
              <span style={styles.presetName}>{item.name}</span>
            </div>
          ))}
        </div>

        <div style={styles.sectionTitle}>ENVIRONMENTS</div>
        <div style={styles.envBox}>
          <div style={styles.dot}></div>
          <span style={{ fontSize: '13px', color: '#e0e0e0' }}>Local Express (Port 3000)</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div style={styles.main}>
        {/* Top Request Bar */}
        <div style={styles.topBar}>
          <select 
            style={{ ...styles.methodSelect, color: getMethodBadgeColor(method) }}
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          <input 
            type="text" 
            style={styles.urlInput}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL (e.g. http://localhost:3000/user)"
          />

          <button 
            style={styles.sendBtn}
            onClick={handleSendRequest}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send '}
          </button>
        </div>

        {/* Tabs for Request Specs */}
        <div style={styles.tabsHeader}>
          <button 
            style={activeTab === 'params' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('params')}
          >
            Params {queryParams.filter(p => p.key).length > 0 && `(${queryParams.filter(p => p.key).length})`}
          </button>
          <button 
            style={activeTab === 'headers' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('headers')}
          >
            Headers {headers.filter(h => h.key).length > 0 && `(${headers.filter(h => h.key).length})`}
          </button>
          <button 
            style={activeTab === 'body' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('body')}
          >
            Body {['POST', 'PUT', 'PATCH'].includes(method) && '●'}
          </button>
        </div>

        {/* Tab Content Area */}
        <div style={styles.tabContent}>
          {activeTab === 'params' && (
            <div>
              <div style={styles.tableTitle}>Query Parameters</div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Key</th>
                    <th style={styles.th}>Value</th>
                    <th style={styles.th}>Description</th>
                    <th style={{ ...styles.th, width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {queryParams.map((p, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>
                        <input 
                          style={styles.tableInput} 
                          placeholder="Key" 
                          value={p.key}
                          onChange={(e) => handleParamChange(idx, 'key', e.target.value)}
                        />
                      </td>
                      <td style={styles.td}>
                        <input 
                          style={styles.tableInput} 
                          placeholder="Value" 
                          value={p.value}
                          onChange={(e) => handleParamChange(idx, 'value', e.target.value)}
                        />
                      </td>
                      <td style={styles.td}>
                        <input 
                          style={styles.tableInput} 
                          placeholder="Description" 
                          value={p.description}
                          onChange={(e) => handleParamChange(idx, 'description', e.target.value)}
                        />
                      </td>
                      <td style={styles.td}>
                        <button style={styles.removeRowBtn} onClick={() => removeParamRow(idx)}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.addRowBtn} onClick={addParamRow}>+ Add Row</button>
            </div>
          )}

          {activeTab === 'headers' && (
            <div>
              <div style={styles.tableTitle}>Headers</div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Key</th>
                    <th style={styles.th}>Value</th>
                    <th style={styles.th}>Description</th>
                    <th style={{ ...styles.th, width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((h, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>
                        <input 
                          style={styles.tableInput} 
                          placeholder="Header Key" 
                          value={h.key}
                          onChange={(e) => handleHeaderChange(idx, 'key', e.target.value)}
                        />
                      </td>
                      <td style={styles.td}>
                        <input 
                          style={styles.tableInput} 
                          placeholder="Header Value" 
                          value={h.value}
                          onChange={(e) => handleHeaderChange(idx, 'value', e.target.value)}
                        />
                      </td>
                      <td style={styles.td}>
                        <input 
                          style={styles.tableInput} 
                          placeholder="Description" 
                          value={h.description}
                          onChange={(e) => handleHeaderChange(idx, 'description', e.target.value)}
                        />
                      </td>
                      <td style={styles.td}>
                        <button style={styles.removeRowBtn} onClick={() => removeHeaderRow(idx)}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.addRowBtn} onClick={addHeaderRow}>+ Add Header</button>
            </div>
          )}

          {activeTab === 'body' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={styles.tableTitle}>JSON Body</span>
                <span style={{ fontSize: '12px', color: '#888' }}>application/json</span>
              </div>
              <textarea 
                style={styles.jsonTextarea}
                rows={8}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder='{\n  "key": "value"\n}'
              />
            </div>
          )}
        </div>

        {/* Response Area */}
        <div style={styles.responseArea}>
          <div style={styles.responseHeader}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: '#ccc' }}>Response</span>
            {response && (
              <div style={styles.metaInfo}>
                <span style={{ color: getStatusColor(response.status), fontWeight: 'bold' }}>
                  Status: {response.status} {response.statusText}
                </span>
                <span>Time: {response.time} ms</span>
                <span>Size: {response.size} B</span>
              </div>
            )}
          </div>

          {!response && !loading && (
            <div style={styles.emptyResponse}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}></div>
              <div>Enter URL and click <strong>Send</strong> to get a response</div>
            </div>
          )}

          {loading && (
            <div style={styles.emptyResponse}>
              <div>Loading response...</div>
            </div>
          )}

          {response && (
            <>
              <div style={styles.resSubTabs}>
                <button 
                  style={responseTab === 'body' ? styles.tabActive : styles.tab}
                  onClick={() => setResponseTab('body')}
                >
                  Body
                </button>
                <button 
                  style={responseTab === 'headers' ? styles.tabActive : styles.tab}
                  onClick={() => setResponseTab('headers')}
                >
                  Headers ({Object.keys(response.headers).length})
                </button>
              </div>

              <div style={styles.responseBox}>
                {responseTab === 'body' && (
                  <pre style={styles.codeView}>
                    {typeof response.data === 'object' 
                      ? JSON.stringify(response.data, null, 2) 
                      : response.data}
                  </pre>
                )}

                {responseTab === 'headers' && (
                  <div style={{ padding: '10px' }}>
                    {Object.entries(response.headers).map(([k, v], i) => (
                      <div key={i} style={styles.headerRow}>
                        <strong style={{ color: '#097bed' }}>{k}:</strong> {v}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline styles for complete self-contained Postman layout
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1e1e1e',
    color: '#f0f0f0',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#252526',
    borderRight: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
  },
  sidebarHeader: {
    paddingBottom: '12px',
    borderBottom: '1px solid #333',
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    marginTop: '10px',
  },
  presetList: {
    flex: 1,
    overflowY: 'auto',
  },
  presetItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    marginBottom: '4px',
    transition: 'background 0.2s',
    backgroundColor: '#2d2d2d',
  },
  methodBadge: {
    fontWeight: 'bold',
    fontSize: '11px',
    width: '50px',
  },
  presetName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#ddd',
  },
  envBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#1e1e1e',
    borderRadius: '4px',
    border: '1px solid #3c3c3c',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#0cbb52',
    marginRight: '8px',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '16px',
  },
  topBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  methodSelect: {
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '8px 12px',
    fontWeight: 'bold',
    fontSize: '14px',
    outline: 'none',
  },
  urlInput: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '8px 14px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  sendBtn: {
    backgroundColor: '#097bed',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 20px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
  },
  tabsHeader: {
    display: 'flex',
    borderBottom: '1px solid #333',
    marginBottom: '10px',
  },
  tab: {
    background: 'none',
    border: 'none',
    color: '#888',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    background: 'none',
    border: 'none',
    color: '#097bed',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    borderBottom: '2px solid #097bed',
  },
  tabContent: {
    minHeight: '160px',
    marginBottom: '15px',
  },
  tableTitle: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#aaa',
    marginBottom: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '8px',
  },
  th: {
    textAlign: 'left',
    fontSize: '11px',
    color: '#777',
    padding: '6px',
    borderBottom: '1px solid #333',
  },
  td: {
    padding: '4px 2px',
  },
  tableInput: {
    width: '95%',
    backgroundColor: '#252526',
    border: '1px solid #3c3c3c',
    borderRadius: '3px',
    color: '#fff',
    padding: '6px',
    fontSize: '12px',
    outline: 'none',
  },
  removeRowBtn: {
    background: 'none',
    border: 'none',
    color: '#ff4d4d',
    cursor: 'pointer',
    fontSize: '12px',
  },
  addRowBtn: {
    background: 'none',
    border: '1px dashed #444',
    color: '#097bed',
    padding: '4px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  jsonTextarea: {
    width: '98%',
    backgroundColor: '#252526',
    border: '1px solid #3c3c3c',
    borderRadius: '4px',
    color: '#9cdcfe',
    fontFamily: 'monospace',
    padding: '10px',
    fontSize: '13px',
    outline: 'none',
  },
  responseArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#252526',
    borderRadius: '6px',
    border: '1px solid #333',
    overflow: 'hidden',
  },
  responseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderBottom: '1px solid #333',
    backgroundColor: '#2d2d2d',
  },
  metaInfo: {
    display: 'flex',
    gap: '15px',
    fontSize: '12px',
    color: '#aaa',
  },
  emptyResponse: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#777',
    fontSize: '14px',
  },
  resSubTabs: {
    display: 'flex',
    borderBottom: '1px solid #333',
    backgroundColor: '#1e1e1e',
  },
  responseBox: {
    flex: 1,
    overflow: 'auto',
    padding: '12px',
  },
  codeView: {
    margin: 0,
    color: '#ce9178',
    fontFamily: 'monospace',
    fontSize: '13px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  headerRow: {
    fontSize: '13px',
    color: '#ddd',
    marginBottom: '4px',
    fontFamily: 'monospace',
  }
};