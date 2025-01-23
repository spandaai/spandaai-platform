import React, { useState } from 'react';
import './App.css';

const ComponentModal = ({ component, onClose }) => {
  return (
    <div className="component-modal-overlay" onClick={onClose}>
      <div 
        className="component-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <img src={component.image} alt={component.name} className="modal-image" />
        <h2 className="modal-title">{component.name}</h2>
        <p className="modal-description">{component.hoverDescription}</p>
        <a 
          href={component.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="component-button modal-button"
        >
          Visit {component.name}
        </a>
      </div>
    </div>
  );
};

const ComponentsDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const components = [
    { 
      id: 1, 
      name: 'Grafana', 
      url: 'http://localhost:3000', 
      description: 'Visualize metrics & logs', 
      image: '/images/grafana.png',
      hoverDescription: 'The visual brain of your infrastructure. Grafana transforms raw data from Prometheus into intuitive dashboards, helping you track system health, performance trends, and critical metrics in real-time. Perfect for monitoring everything from server loads to application response times.'
    },
    { 
      id: 2, 
      name: 'Prometheus', 
      url: 'http://localhost:9090', 
      description: 'Monitoring & alerts', 
      image: '/images/prometheus.png',
      hoverDescription: 'The data collector and time-series database that powers your monitoring ecosystem. Prometheus continuously scrapes metrics from your services, stores them efficiently, and enables complex queries. It works seamlessly with AlertManager to trigger notifications when something goes wrong.'
    },
    { 
      id: 3, 
      name: 'AlertManager', 
      url: 'http://localhost:9093', 
      description: 'Manage alerts effectively', 
      image: '/images/alertmanager.png',
      hoverDescription: 'Your system\'s early warning system. AlertManager intelligently routes, deduplicates, and manages alerts from Prometheus. It can send notifications via email, Slack, PagerDuty, and more, ensuring your team responds quickly to potential issues.'
    },
    { 
      id: 4, 
      name: 'Kafka', 
      url: 'http://localhost:9092', 
      description: 'Stream processing platform', 
      image: '/images/kafka.png',
      hoverDescription: 'The high-speed messaging backbone of distributed systems. Kafka enables real-time data streaming between services, supports event sourcing, and provides fault-tolerant message queuing. It\'s crucial for building reactive, event-driven architectures.'
    },
    { 
      id: 5, 
      name: 'Redis', 
      url: 'http://localhost:6379', 
      description: 'In-memory data store', 
      image: '/images/redis.png',
      hoverDescription: 'Lightning-fast in-memory cache and data structure store. Redis accelerates application performance by caching frequently accessed data, supports complex data types, and can be used for real-time analytics, leaderboards, and session management.'
    },
    { 
      id: 6, 
      name: 'MySQL', 
      url: 'http://localhost:3306', 
      description: 'Relational database', 
      image: '/images/mysql.png',
      hoverDescription: 'The reliable relational database for structured data storage. MySQL provides ACID-compliant transactions, robust data integrity, and supports complex queries. It\'s ideal for applications requiring consistent, structured data management.'
    },
    { 
      id: 7, 
      name: 'Ollama', 
      url: 'http://localhost:11434', 
      description: 'Run LLMs locally!', 
      image: '/images/ollama.png',
      hoverDescription: 'Local Large Language Model (LLM) deployment platform. Ollama lets you run powerful AI models on your own infrastructure, enabling privacy-focused, low-latency AI capabilities without external API dependencies.'
    },
    { 
      id: 8, 
      name: 'Verba', 
      url: 'http://localhost:8000', 
      description: 'Retrieval Augmented Generation', 
      image: '/images/verba.png',
      hoverDescription: 'Advanced AI-powered knowledge retrieval system. Verba combines semantic search with generative AI to provide context-aware, dynamically generated responses by retrieving and augmenting information from your data sources.'
    }
  ];

  return (
    <div className="dashboard">
      <h1>Spanda.AI Platform Components</h1>
      <div className="components-grid">
        {components.map((component) => (
          <div 
            key={component.id} 
            className="component-tile"
            onClick={() => setSelectedComponent(component)}
          >
            <img src={component.image} alt={component.name} className="component-image" />
            <h2 className="component-title">{component.name}</h2>
            <p className="component-description">{component.description}</p>
            <button className="component-button">Learn More</button>
          </div>
        ))}
      </div>
      
      {selectedComponent && (
        <ComponentModal 
          component={selectedComponent} 
          onClose={() => setSelectedComponent(null)} 
        />
      )}
    </div>
  );
};

export default ComponentsDashboard;