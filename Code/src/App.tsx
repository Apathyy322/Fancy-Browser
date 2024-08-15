import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form, Dropdown } from 'react-bootstrap';
import Search from './components/search';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

type Theme = 'light' | 'dark' | 'blue' | 'purple' | 'berserk' | 'custom';
const themes: Theme[] = ['light', 'dark', 'blue', 'purple', 'berserk'];

const App: React.FC = () => {
  const savedTheme = Cookies.get('theme') as Theme;
  const [currentTheme, setCurrentTheme] = useState<Theme>(savedTheme || 'dark');
  const [customBackground, setCustomBackground] = useState<string | null>(Cookies.get('customBackground') || null);
  const [presets, setPresets] = useState<{ [key: string]: string }>({});
  const [showPresetForm, setShowPresetForm] = useState<boolean>(false);
  const [presetName, setPresetName] = useState<string>('');
  const [presetImage, setPresetImage] = useState<string>('');

  useEffect(() => {
    if (currentTheme === 'custom' && customBackground) {
      document.body.style.backgroundImage = `url(${customBackground})`;
    } else {
      document.body.style.backgroundImage = '';
      document.body.className = currentTheme;
    }
    Cookies.set('theme', currentTheme, { expires: 365 });
    if (customBackground) {
      Cookies.set('customBackground', customBackground, { expires: 365 });
    }
  }, [currentTheme, customBackground]);

  useEffect(() => {
    const savedPresets = Cookies.get('presets');
    if (savedPresets) {
      setPresets(JSON.parse(savedPresets));
    }
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const handleSavePreset = () => {
    if (presetName && presetImage) {
      const newPresets = { ...presets, [presetName]: presetImage };
      Cookies.set('presets', JSON.stringify(newPresets), { expires: 365 });
      setPresets(newPresets);
      setCustomBackground(presetImage);
      setCurrentTheme('custom');
      setShowPresetForm(false);
      setPresetName('');
      setPresetImage('');
    }
  };

  const handleDeletePreset = (name: string) => {
    const updatedPresets = { ...presets };
    delete updatedPresets[name];
    Cookies.set('presets', JSON.stringify(updatedPresets), { expires: 365 });
    setPresets(updatedPresets);
  };

  return (
    <div className={`App ${currentTheme}`}>
      <header className="header">
        <h1 className='title'>Fancy Browser</h1>
        <Search />
      </header>
      <div className="controls">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdownMenuButton1">
            Change Theme
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {themes.map((theme) => (
              <Dropdown.Item
                key={theme}
                onClick={() => handleThemeChange(theme)}
                active={currentTheme === theme}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          variant="primary"
          className={`preset-btn ${showPresetForm ? 'active' : ''}`}
          onClick={() => setShowPresetForm(!showPresetForm)}
        >
          Add Preset
        </Button>
        {showPresetForm && (
          <Form className="preset-form">
            <Form.Group controlId="presetName">
              <Form.Label>Preset Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter preset name"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="presetImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={presetImage}
                onChange={(e) => setPresetImage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSavePreset}>
              Save Preset
            </Button>
          </Form>
        )}
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="presetDropdown">
            Presets
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(presets).map((preset) => (
              <Dropdown.Item key={preset}>
                <div className="preset-item">
                  {preset}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePreset(preset)}
                    style={{ float: 'right' }}
                  >
                    Delete
                  </Button>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default App;
