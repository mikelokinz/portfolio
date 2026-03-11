import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Load from local storage
  useEffect(() => {
    const savedComments = localStorage.getItem('portfolio-comments');
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        console.error('Error parsing comments from local storage', e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('portfolio-comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setComments([newComment, ...comments]);
    setName('');
    setMessage('');
  };

  return (
    <section id="comments" className="container section" style={{ paddingTop: '2rem' }}>
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: '-100px' }}
         transition={{ duration: 0.5 }}
         style={{ background: 'var(--bg-secondary)', padding: '3rem 2rem', borderRadius: '1rem', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <MessageSquare size={28} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Leave a Trace</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'revert', gap: '3rem' }} className="comments-layout">
          {/* Form */}
          <div style={{ flex: 1 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="interactive"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.25rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'border-color var(--transition-fast)',
                    cursor: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="interactive"
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.25rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color var(--transition-fast)',
                    cursor: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  placeholder="Your website is awesome!"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="interactive"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginTop: '0.5rem',
                  alignSelf: 'flex-start'
                }}
              >
                <Send size={18} /> Post Comment
              </motion.button>
            </form>
          </div>

          {/* Comment List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }} className="comments-list">
            <AnimatePresence>
              {comments.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}
                >
                  No traces left yet. Be the first!
                </motion.p>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      background: 'var(--bg-primary)',
                      padding: '1.25rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                      <h4 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{comment.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{comment.date}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.9rem' }}>
                      {comment.message}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 768px) {
          .comments-layout { grid-template-columns: 1fr 1fr !important; }
        }
        .comments-list::-webkit-scrollbar {
          width: 6px;
        }
        .comments-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .comments-list::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default Comments;
