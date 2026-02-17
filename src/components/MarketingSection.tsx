
import React from 'react';
import { GitCommit, Download, Terminal, Coffee } from 'lucide-react';

export const MarketingSection = () => {
    return (
        <div className="marketing-section">
            <h2>How it Works</h2>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="icon-box"><GitCommit size={24} /></div>
                    <h3>1. Visual Planning</h3>
                    <p>Click and drag on the grid to paint your dream contribution graph. Use different shades to represent commit intensity.</p>
                </div>

                <div className="feature-card">
                    <div className="icon-box"><Terminal size={24} /></div>
                    <h3>2. Generate Script</h3>
                    <p>Once you're happy, click "Script" to download a shell script. This script contains Git commands to create empty commits for those specific dates.</p>
                </div>

                <div className="feature-card">
                    <div className="icon-box"><Download size={24} /></div>
                    <h3>3. Execute & Push</h3>
                    <p>Run the script in a new private repository. Push it to GitHub, and watch your profile update instantly!</p>
                </div>
            </div>

            <div className="faq-section">
                <h3>Frequently Asked Questions</h3>

                <div className="faq-item">
                    <h4>Is this safe?</h4>
                    <p>Yes! The script only creates empty commits with backdated timestamps in a <b>new, separate folder</b>. It does not touch your existing projects or code.</p>
                </div>

                <div className="faq-item">
                    <h4>Why 2026?</h4>
                    <p>Ideally, you plan for the future! But effective planning starts now. You can adjust the script for any year if you know bash.</p>
                </div>

                <div className="faq-item">
                    <h4>Can I get in trouble?</h4>
                    <p>GitHub creates the contribution graph based on commit dates. Backdating commits is a known feature of Git. Using this for art or planning is generally fine, but don't use it to deceive employers!</p>
                </div>
            </div>

            <div className="footer-note">
                <p>
                    <Coffee size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />
                    Built for fun and motivation. Go fill those squares!
                </p>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <a href="https://www.buymeacoffee.com/srinivasgogula" target="_blank" rel="noreferrer">
                        <img
                            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=srinivasgogula&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
                            alt="Buy me a coffee"
                            style={{ height: '50px' }}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};
