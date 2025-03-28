import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { pilotAvatars, teamAvatars } from "../assets/avatar-imports";

const AvatarDebug: React.FC = () => {
  // Function to log image loading status
  const logImageLoad = (status: 'success' | 'error', path: string) => {
    console.log(`[AvatarDebug] Image ${status}: ${path}`);
  };

  // Get all avatar paths from the data
  const pilotPaths = Object.entries(pilotAvatars).map(([key, value]) => ({
    name: key,
    importedPath: value,
    directPath: `/assets/${key.replace('AI', '-AI')}.png`
  }));

  const teamPaths = Object.entries(teamAvatars).map(([key, value]) => ({
    name: key,
    importedPath: value,
    directPath: `/assets/${key.replace('Team', '')}.jpeg`
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Avatar Debug Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
              <p><strong>Hostname:</strong> {window.location.hostname}</p>
              <p><strong>Origin:</strong> {window.location.origin}</p>
              <p><strong>Is Production:</strong> {(process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost').toString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Pilot Avatars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {pilotPaths.map((pilot) => (
          <Card key={pilot.name}>
            <CardHeader>
              <CardTitle>{pilot.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Imported Path:</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
                    <code>{String(pilot.importedPath)}</code>
                  </div>
                  <div className="mt-2">
                    <img 
                      src={pilot.importedPath} 
                      alt={`${pilot.name} (imported)`} 
                      className="h-16 w-16 rounded-full object-cover border"
                      onLoad={() => logImageLoad('success', String(pilot.importedPath))}
                      onError={() => logImageLoad('error', String(pilot.importedPath))}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Direct Path:</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
                    <code>{pilot.directPath}</code>
                  </div>
                  <div className="mt-2">
                    <img 
                      src={pilot.directPath} 
                      alt={`${pilot.name} (direct)`} 
                      className="h-16 w-16 rounded-full object-cover border"
                      onLoad={() => logImageLoad('success', pilot.directPath)}
                      onError={() => logImageLoad('error', pilot.directPath)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Team Avatars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamPaths.map((team) => (
          <Card key={team.name}>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Imported Path:</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
                    <code>{String(team.importedPath)}</code>
                  </div>
                  <div className="mt-2">
                    <img 
                      src={team.importedPath} 
                      alt={`${team.name} (imported)`} 
                      className="h-16 w-16 rounded-full object-cover border"
                      onLoad={() => logImageLoad('success', String(team.importedPath))}
                      onError={() => logImageLoad('error', String(team.importedPath))}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Direct Path:</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
                    <code>{team.directPath}</code>
                  </div>
                  <div className="mt-2">
                    <img 
                      src={team.directPath} 
                      alt={`${team.name} (direct)`} 
                      className="h-16 w-16 rounded-full object-cover border"
                      onLoad={() => logImageLoad('success', team.directPath)}
                      onError={() => logImageLoad('error', team.directPath)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="font-bold mb-2">Additional Test Paths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            '/assets/General-AI.png',
            '/General-AI.png',
            '/avatars/General-AI.png',
            '/public/avatars/General-AI.png'
          ].map((path, index) => (
            <div key={index} className="text-center">
              <div className="bg-white dark:bg-gray-700 p-2 rounded-md mb-2 text-sm overflow-hidden">
                <code>{path}</code>
              </div>
              <img 
                src={path} 
                alt={`Test path ${index + 1}`} 
                className="h-16 w-16 mx-auto rounded-full object-cover border"
                onLoad={() => logImageLoad('success', path)}
                onError={() => logImageLoad('error', path)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarDebug;
