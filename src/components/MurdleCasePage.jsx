import React, { useMemo, useState } from 'react';

const suspects = [
  { id: 'ari', name: 'Ari', detail: "Dr. Ira's alias" },
  { id: 'hamza', name: 'Hamza', detail: 'Lab assistant' },
  { id: 'joeybing', name: 'JoeyBing', detail: 'F.R.I.E.N.D.S data analyst' },
  { id: 'eleven', name: 'Eleven', detail: 'Security head' },
  { id: 'penelope', name: 'Penelope', detail: 'Journalist' }
];

const weapons = [
  { id: 'syringe', name: 'Syringe', detail: 'Experiment tool' },
  { id: 'knife', name: 'Knife', detail: 'Close-range weapon' },
  { id: 'poison-vial', name: 'Poison vial', detail: 'Chemical method' },
  { id: 'usb-drive', name: 'USB drive', detail: 'Data kill' },
  { id: 'hammer', name: 'Hammer', detail: 'Blunt force' }
];

const locations = [
  { id: 'lab-chamber', name: 'Lab Chamber', detail: 'Primary experiment site' },
  { id: 'server-room', name: 'Server Room', detail: 'Restricted systems bay' },
  { id: 'hotel-room', name: 'Hotel Room', detail: 'Off-site hideout' },
  { id: 'parking-basement', name: 'Parking Basement', detail: 'Vehicle access zone' },
  { id: 'control-office', name: 'Control Office', detail: 'Command desk' }
];

const clues = [
  'The crime did not happen in the Server Room or Parking Basement.',
  'The knife was not used by the culprit.',
  'Penelope was seen in the Control Office, not at the crime scene. Ari was seen to be treating victims with syringes. (one misleading clue)',
  'The person who used the Poison vial was in the Hotel Room.',
  'Eleven never entered the Lab Chamber.',
  'The Syringe was used in the Lab Chamber.',
  'Hamza was handling the USB drive, not any physical weapon.',
  'JoeyBing was not in the Lab Chamber.',
  'The culprit is someone who had direct access to experiments.',
  'Only one person had access to both the Lab Chamber and bio-experimental tools.'
];

const correctAnswer = {
  suspect: 'ari',
  weapon: 'syringe',
  location: 'lab-chamber'
};

const boardDefinitions = [
  {
    key: 'suspectWeapon',
    title: 'Who x Weapon',
    rows: suspects,
    columns: weapons
  },
  {
    key: 'suspectLocation',
    title: 'Who x Where',
    rows: suspects,
    columns: locations
  },
  {
    key: 'weaponLocation',
    title: 'Weapon x Where',
    rows: weapons,
    columns: locations
  }
];

const createBoardState = (rows, columns) =>
  Object.fromEntries(
    rows.flatMap((row) =>
      columns.map((column) => [`${row.id}:${column.id}`, 'empty'])
    )
  );

const initialBoards = {
  suspectWeapon: createBoardState(suspects, weapons),
  suspectLocation: createBoardState(suspects, locations),
  weaponLocation: createBoardState(weapons, locations)
};

const cycleMark = (value) => {
  if (value === 'empty') return 'check';
  if (value === 'check') return 'cross';
  return 'empty';
};

const assetExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

const candidatePaths = (folder, id) => [
  ...assetExtensions.map((extension) => `/images/murdle/${folder}/${id}.${extension}`),
  ...assetExtensions.map((extension) => `/images/${folder}/${id}.${extension}`),
  ...assetExtensions.map((extension) => `/images/murdle/${id}.${extension}`),
  ...assetExtensions.map((extension) => `/images/${id}.${extension}`)
];

const downloadBlobFromUrl = async (url, filename) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Asset not found');
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
};

const downloadSelectedAssets = async (selection) => {
  const requests = [
    { folder: 'suspects', id: selection.suspect },
    { folder: 'weapons', id: selection.weapon },
    { folder: 'locations', id: selection.location }
  ];

  const downloaded = [];
  const missing = [];

  for (const request of requests) {
    let success = false;

    for (const assetPath of candidatePaths(request.folder, request.id)) {
      try {
        const filename = assetPath.split('/').pop();
        await downloadBlobFromUrl(assetPath, filename);
        downloaded.push(request.id);
        success = true;
        break;
      } catch {
        continue;
      }
    }

    if (!success) {
      missing.push(request.id);
    }
  }

  return { downloaded, missing };
};

const markLabel = (value) => {
  if (value === 'check') return '\u2713';
  if (value === 'cross') return '\u2715';
  return '';
};

const markColors = (value) => {
  if (value === 'check') {
    return {
      background: 'rgba(18, 100, 45, 0.45)',
      borderColor: 'rgba(90, 220, 130, 0.55)',
      color: '#c7ffd7'
    };
  }

  if (value === 'cross') {
    return {
      background: 'rgba(125, 10, 10, 0.45)',
      borderColor: 'rgba(255, 80, 80, 0.55)',
      color: '#ffd0d0'
    };
  }

  return {
    background: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(204, 0, 0, 0.18)',
    color: 'var(--ash)'
  };
};

const ChoiceTiles = ({ title, options, value, onChange }) => (
  <div style={{ width: '100%' }}>
    <div className="special-font" style={{
      color: 'var(--crimson)',
      fontSize: '0.82rem',
      letterSpacing: '0.24em',
      marginBottom: '0.8rem',
      textTransform: 'uppercase'
    }}>
      {title}
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '0.75rem'
    }}>
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            style={{
              padding: '0.9rem',
              borderRadius: '12px',
              border: active ? '1px solid var(--hot-red)' : '1px solid rgba(204, 0, 0, 0.22)',
              background: active ? 'rgba(140, 10, 10, 0.45)' : 'rgba(255, 255, 255, 0.03)',
              color: '#fff',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: active ? '0 0 22px rgba(255, 26, 26, 0.25)' : 'none'
            }}
          >
            <div className="cinzel-font" style={{ fontSize: '1.06rem', marginBottom: '0.2rem' }}>
              {option.name}
            </div>
            <div style={{ color: 'var(--faint)', fontSize: '0.88rem', lineHeight: 1.4 }}>
              {option.detail}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const MurdleCasePage = ({ onSolved }) => {
  const [boards, setBoards] = useState(initialBoards);
  const [selection, setSelection] = useState({
    suspect: '',
    weapon: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const caseSummary = useMemo(
    () => ({
      suspect: suspects.find((item) => item.id === selection.suspect)?.name,
      weapon: weapons.find((item) => item.id === selection.weapon)?.name,
      location: locations.find((item) => item.id === selection.location)?.name
    }),
    [selection]
  );

  const updateBoardCell = (boardKey, cellKey) => {
    setBoards((current) => ({
      ...current,
      [boardKey]: {
        ...current[boardKey],
        [cellKey]: cycleMark(current[boardKey][cellKey])
      }
    }));
  };

  const handleSolve = async (event) => {
    event.preventDefault();

    if (!selection.suspect || !selection.weapon || !selection.location) {
      setError('Choose one suspect, one weapon, and one location before submitting.');
      setDownloadStatus('');
      return;
    }

    setSubmitting(true);
    setError('');

    const result = await downloadSelectedAssets(selection);

    if (result.downloaded.length > 0 && result.missing.length === 0) {
      setDownloadStatus('Selected files downloaded successfully.');
    } else if (result.downloaded.length > 0) {
      setDownloadStatus('Some selected files downloaded. Upload the remaining assets later to complete auto-downloads.');
    } else {
      setDownloadStatus('Download hooks are ready. Add the matching files in images to enable automatic downloads.');
    }

    const solved =
      selection.suspect === correctAnswer.suspect &&
      selection.weapon === correctAnswer.weapon &&
      selection.location === correctAnswer.location;

    if (!solved) {
      setError('That theory does not close the case. Re-check the clues and your board.');
      setSubmitting(false);
      return;
    }

    setTimeout(() => {
      setSubmitting(false);
      onSolved();
    }, 900);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      padding: '5.5rem 1.25rem 3rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{
          padding: '1.8rem',
          borderRadius: '24px',
          border: '1px solid rgba(204, 0, 0, 0.3)',
          background: 'rgba(10, 0, 0, 0.82)',
          boxShadow: 'var(--shadow)'
        }}>
          <div className="special-font" style={{
            color: 'var(--crimson)',
            fontSize: '0.85rem',
            letterSpacing: '0.35em',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Case File // Janise Clearance
          </div>

          <h1 className="creepy-title" style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
            marginBottom: '0.8rem'
          }}>
            The Lab Chamber Murdle
          </h1>

          <p className="special-font" style={{
            color: 'var(--faint)',
            maxWidth: '860px',
            lineHeight: 1.65,
            marginBottom: '1.5rem'
          }}>
            Inspired by Murdle&apos;s deduction-board format, this page lets players eliminate possibilities with check and cross marks before submitting their final theory.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '0.9rem'
          }}>
            <div style={{
              border: '1px solid rgba(204, 0, 0, 0.22)',
              borderRadius: '14px',
              padding: '1rem',
              background: 'rgba(255,255,255,0.03)'
            }}>
              <div className="special-font" style={{ color: 'var(--crimson)', marginBottom: '0.45rem' }}>
                Suspects
              </div>
              <div style={{ color: 'var(--faint)', lineHeight: 1.5 }}>
                {suspects.length} profiles under suspicion
              </div>
            </div>

            <div style={{
              border: '1px solid rgba(204, 0, 0, 0.22)',
              borderRadius: '14px',
              padding: '1rem',
              background: 'rgba(255,255,255,0.03)'
            }}>
              <div className="special-font" style={{ color: 'var(--crimson)', marginBottom: '0.45rem' }}>
                Weapons
              </div>
              <div style={{ color: 'var(--faint)', lineHeight: 1.5 }}>
                5 possible tools of sabotage
              </div>
            </div>

            <div style={{
              border: '1px solid rgba(204, 0, 0, 0.22)',
              borderRadius: '14px',
              padding: '1rem',
              background: 'rgba(255,255,255,0.03)'
            }}>
              <div className="special-font" style={{ color: 'var(--crimson)', marginBottom: '0.45rem' }}>
                Locations
              </div>
              <div style={{ color: 'var(--faint)', lineHeight: 1.5 }}>
                5 possible crime scenes
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {boardDefinitions.map((board) => (
              <div
                key={board.key}
                style={{
                  borderRadius: '20px',
                  border: '1px solid rgba(204, 0, 0, 0.28)',
                  background: 'rgba(10, 0, 0, 0.8)',
                  padding: '1rem',
                  boxShadow: '0 18px 42px rgba(0, 0, 0, 0.38)',
                  overflowX: 'auto'
                }}
              >
                <div className="special-font" style={{
                  color: 'var(--crimson)',
                  letterSpacing: '0.18em',
                  marginBottom: '0.9rem'
                }}>
                  {board.title}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `190px repeat(${board.columns.length}, minmax(64px, 1fr))`,
                    minWidth: `${190 + board.columns.length * 72}px`
                  }}
                >
                  <div />
                  {board.columns.map((column) => (
                    <div
                      key={column.id}
                      className="special-font"
                      style={{
                        padding: '0.55rem',
                        textAlign: 'center',
                        fontSize: '0.76rem',
                        letterSpacing: '0.08em',
                        color: 'var(--faint)'
                      }}
                    >
                      {column.name}
                    </div>
                  ))}

                  {board.rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <div
                        className="special-font"
                        style={{
                          padding: '0.7rem',
                          color: '#fff',
                          borderTop: '1px solid rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {row.name}
                      </div>
                      {board.columns.map((column) => {
                        const cellKey = `${row.id}:${column.id}`;
                        const cellValue = boards[board.key][cellKey];
                        return (
                          <button
                            key={cellKey}
                            type="button"
                            onClick={() => updateBoardCell(board.key, cellKey)}
                            aria-label={`${row.name} and ${column.name}`}
                            style={{
                              minHeight: '60px',
                              border: `1px solid ${markColors(cellValue).borderColor}`,
                              background: markColors(cellValue).background,
                              color: markColors(cellValue).color,
                              cursor: 'pointer',
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              transition: 'all 0.2s'
                            }}
                          >
                            {markLabel(cellValue)}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{
              borderRadius: '20px',
              border: '1px solid rgba(204, 0, 0, 0.28)',
              background: 'rgba(10, 0, 0, 0.8)',
              padding: '1.15rem 1.15rem 1.25rem'
            }}>
              <div className="special-font" style={{
                color: 'var(--crimson)',
                letterSpacing: '0.22em',
                marginBottom: '0.9rem'
              }}>
                Clues
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem'
              }}>
                {clues.map((clue, index) => (
                  <div key={clue} style={{
                    border: '1px solid rgba(204, 0, 0, 0.18)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '0.85rem 0.9rem'
                  }}>
                    <div className="special-font" style={{
                      color: 'var(--crimson)',
                      marginBottom: '0.35rem',
                      fontSize: '0.82rem',
                      letterSpacing: '0.16em'
                    }}>
                      CLUE {index + 1}
                    </div>
                    <div style={{
                      color: 'var(--ash)',
                      lineHeight: 1.55,
                      fontSize: '0.96rem'
                    }}>
                      {clue}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSolve}
              style={{
                borderRadius: '20px',
                border: '1px solid rgba(204, 0, 0, 0.28)',
                background: 'rgba(10, 0, 0, 0.84)',
                padding: '1.2rem'
              }}
            >
              <div className="special-font" style={{
                color: 'var(--crimson)',
                letterSpacing: '0.22em',
                marginBottom: '0.9rem'
              }}>
                Final Theory
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <ChoiceTiles
                  title="Culprit"
                  options={suspects}
                  value={selection.suspect}
                  onChange={(suspect) => setSelection((current) => ({ ...current, suspect }))}
                />

                <ChoiceTiles
                  title="Weapon"
                  options={weapons}
                  value={selection.weapon}
                  onChange={(weapon) => setSelection((current) => ({ ...current, weapon }))}
                />

                <ChoiceTiles
                  title="Location"
                  options={locations}
                  value={selection.location}
                  onChange={(location) => setSelection((current) => ({ ...current, location }))}
                />

                <div style={{
                  borderRadius: '14px',
                  border: '1px solid rgba(204, 0, 0, 0.18)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '1rem'
                }}>
                  <div className="special-font" style={{
                    color: 'var(--crimson)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.18em'
                  }}>
                    Selected Theory
                  </div>
                  <div style={{ color: 'var(--ash)', lineHeight: 1.6 }}>
                    Culprit: {caseSummary.suspect || '...'}
                    <br />
                    Weapon: {caseSummary.weapon || '...'}
                    <br />
                    Location: {caseSummary.location || '...'}
                  </div>
                </div>

                <button className="creepy-button" type="submit" disabled={submitting}>
                  {submitting ? 'PROCESSING THEORY...' : 'LOCK THE THEORY'}
                </button>

                {downloadStatus && (
                  <div className="special-font" style={{
                    color: 'var(--faint)',
                    fontSize: '0.86rem',
                    lineHeight: 1.5
                  }}>
                    {downloadStatus}
                  </div>
                )}

                {error && (
                  <div className="special-font" style={{
                    color: 'var(--hot-red)',
                    fontSize: '0.88rem',
                    lineHeight: 1.5
                  }}>
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MurdleCasePage;
